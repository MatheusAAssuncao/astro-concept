import { 
  Sparkles, 
  Footprints, 
  Eye, 
  Brush, 
  Zap, 
  Hand, 
  Scissors, 
  Flower2, 
  Heart,
  Smile,
  Star,
  Crown,
  Award
} from "lucide-astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

/**
 * Mapa de ícones do Directus para componentes Lucide
 */
const iconMap: Record<string, AstroComponentFactory> = {
  Sparkles,
  Footprints,
  Eye,
  Brush,
  Zap,
  Hand,
  Scissors,
  Flower2,
  Heart,
  Smile,
  Star,
  Crown,
  Award
};

/**
 * Retorna o componente de ícone baseado no nome string do Directus
 * @param iconName - Nome do ícone (ex: 'Heart', 'Zap')
 * @returns Componente do ícone ou Sparkles como fallback
 */
export function getIconComponent(iconName: string): AstroComponentFactory {
  return iconMap[iconName] || Sparkles;
}

/**
 * Gera slug a partir de um título
 * Remove acentos, converte para minúsculas e substitui espaços por hífens
 * @param titulo - Título a ser convertido
 * @returns Slug formatado
 */
export function gerarSlug(titulo: string): string {
  return titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/[\s_-]+/g, '-') // Substitui espaços por hífens
    .replace(/^-+|-+$/g, ''); // Remove hífens no início/fim
}

/**
 * Processa conteúdo HTML convertendo quebras de linha em parágrafos
 * Se o conteúdo já tem tags <p>, mantém como está
 * Se não, converte \n em tags <p>
 * @param texto - Conteúdo a ser processado
 * @returns HTML formatado
 */
export function processarConteudoHTML(texto: string): string {
  if (texto.includes('<p>') || texto.includes('<p ')) {
    return texto;
  }
  
  const paragrafos = texto
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p style="font-size: 1.2rem; line-height: 1.4; margin-bottom: 1.5rem;">${p}</p>`)
    .join('\n');
  
  return paragrafos;
}

export function processarConteudoHTMLRaw(texto: string): string {
  if (texto.includes('<p>') || texto.includes('<p ')) {
    return texto;
  }
  
  const paragrafos = texto
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${p}</p>`)
    .join('\n');
  
  return paragrafos;
}