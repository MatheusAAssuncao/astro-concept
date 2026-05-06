import { createDirectus, readItems, rest, staticToken } from '@directus/sdk';
import fs from 'node:fs';
import path from 'node:path';

// ============================================
// INTERFACES DO DIRECTUS
// ============================================

interface Historia {
	id: string;
	imagem: string;
	titulo: string;
	conteudo: string;
	status: string;
}

interface Servicos {
	id: number;
	icone: string;
	titulo: string;
	subtitulo?: string;
	descricao: string;
	conteudo?: string | null;
	imagem?: string | null;
	sort: number | null;
	status: string;
	date_created?: string | null;
	date_updated?: string | null;
	user?: string;
}

interface Contato {
	id: string;
	telefone: string;
	instagram?: string;
	facebook?: string;
	funcionamento?: string;
	status: string;
}

interface DirectusSchema {
	Historia: Historia[];
	Servicos: Servicos[];
	Contato: Contato[];
}

// ============================================
// CLIENTE DIRECTUS
// ============================================

/**
 * Instância do cliente Directus configurada com REST API
 * Usa as variáveis de ambiente DIRECTUS_URL e DIRECTUS_TOKEN
 */
const directus = createDirectus<DirectusSchema>(import.meta.env.DIRECTUS_URL)
	.with(staticToken(import.meta.env.DIRECTUS_TOKEN))
	.with(rest());

export default directus;

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Busca os dados completos da seção História (conteúdo e imagem)
 * @returns Objeto com conteúdo e imagem, ou null em caso de erro
 */
export async function getHistoria(): Promise<Historia | null> {
	try {
		const result = await directus.request(
			readItems('Historia', {
				limit: 1,
				fields: ['*'],
			})
		);

		return result[0] || null;
	} catch (error) {
		console.error('Erro ao buscar história:', error);
		return null;
	}
}

/**
 * Busca todos os cards da seção Serviços
 * @returns Array de serviços ordenados
 */
export async function getServicos(): Promise<Servicos[]> {
	try {
		const result = await directus.request(
			readItems('Servicos', {
				sort: ['sort'],
				fields: ['*'],
				filter: {
					status: { _eq: 'published' }
				}
			})
		);

		return result || [];
	} catch (error) {
		console.error('Erro ao buscar serviços:', error);
		return [];
	}
}

/**
 * Busca as informações de contato (telefone e funcionamento)
 * @returns Objeto com informações de contato
 */
export async function getContato(): Promise<Contato | null> {
	try {
		const result = await directus.request(
			readItems('Contato', {
				limit: 1,
				fields: ['*'],
			})
		);
		
		return result[0] || null;
	} catch (error) {
		console.error('Erro ao buscar contato:', error);
		return null;
	}
}

/**
 * Gera URL completa para uma imagem do Directus
 * @param imageId - ID da imagem no Directus
 * @param width - Largura desejada (opcional)
 * @param quality - Qualidade da imagem (0-100, padrão: 80)
 * @returns URL completa da imagem
 */
export function getImageUrl(
	imageId: string, 
	width?: number, 
	quality: number = 80
): string {
	const baseUrl = import.meta.env.DIRECTUS_URL;
	const token = import.meta.env.DIRECTUS_TOKEN;
	const auth = token ? `&access_token=${token}` : '';

	if (!width) {
		return `${baseUrl}/assets/${imageId}?${token ? `access_token=${token}` : ''}`;
	}

	return `${baseUrl}/assets/${imageId}?width=${width}&quality=${quality}&format=webp${auth}`;
}

/**
 * Baixa uma imagem do Directus e salva localmente durante o build
 * @param imageId - ID da imagem no Directus
 * @param outputPath - Caminho local onde salvar (ex: 'public/images/historia.webp')
 * @returns Caminho relativo da imagem salva ou URL externa em caso de erro
 */
export async function downloadImage(
	imageId: string,
	outputPath: string
): Promise<string> {
	try {
		const imageUrl = getImageUrl(imageId, 800);
		
		const response = await fetch(imageUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch image: ${response.statusText}`);
		}

		const buffer = await response.arrayBuffer();
		
		const publicPath = outputPath;
		const distPath = outputPath.replace('public/', 'dist/');
		
		const publicDir = path.dirname(publicPath);
		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir, { recursive: true });
		}
		fs.writeFileSync(publicPath, Buffer.from(buffer));
		console.log(`✅ Imagem salva em public: ${publicPath}`);
		
		const distDir = path.dirname(distPath);
		if (!fs.existsSync(distDir)) {
			fs.mkdirSync(distDir, { recursive: true });
		}
		fs.writeFileSync(distPath, Buffer.from(buffer));
		console.log(`✅ Imagem salva em dist: ${distPath}`);
		
		return outputPath.replace(/^public\//, '/');
	} catch (error) {
		console.error('❌ Erro ao baixar imagem:', error);
		return getImageUrl(imageId, 800);
	}
}
