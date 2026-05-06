# 🚀 Guia Completo de SEO para Projetos Astro

Este guia fornece instruções passo a passo para implementar SEO otimizado em qualquer projeto Astro, baseado nas melhores práticas aplicadas no projeto Concept Estética.

---

## 📋 Índice

1. [Configuração Inicial](#1-configuração-inicial)
2. [Layout Base com Meta Tags](#2-layout-base-com-meta-tags)
3. [Schema.org (Structured Data)](#3-schemaorg-structured-data)
4. [Sitemap XML](#4-sitemap-xml)
5. [Robots.txt](#5-robotstxt)
6. [Otimização de Conteúdo](#6-otimização-de-conteúdo)
7. [Imagem Open Graph](#7-imagem-open-graph)
8. [Checklist Final](#8-checklist-final)
9. [Ferramentas de Validação](#9-ferramentas-de-validação)
10. [Monitoramento Pós-Deploy](#10-monitoramento-pós-deploy)

---

## 1. Configuração Inicial

### 1.1. Configure o Site URL no `astro.config.mjs`

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seu-dominio.com', // ⚠️ OBRIGATÓRIO para SEO
  integrations: [sitemap()],
});
```

### 1.2. Instale o Plugin de Sitemap

```bash
npm install @astrojs/sitemap
```

---

## 2. Layout Base com Meta Tags

### 2.1. Crie um Layout Otimizado (`src/layouts/Layout.astro`)

```astro
---
import "../styles/global.css";

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const {
  title = "Título Padrão com Palavras-Chave | Nome da Marca",
  description = "Descrição otimizada com chamada para ação. Seja específico sobre o que você oferece e inclua localização se aplicável.",
  image = "/og-image.jpg",
} = Astro.props;

const siteUrl = "https://seu-dominio.com"; // Use import.meta.env.SITE em produção
const canonicalURL = new URL(Astro.url.pathname, siteUrl).href;
const fullImageUrl = new URL(image, siteUrl).href;
---

<!doctype html>
<html lang="pt-PT"> <!-- Ajuste o idioma conforme necessário -->
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    
    <!-- SEO Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={fullImageUrl} />
    <meta property="og:locale" content="pt_PT" />
    <meta property="og:site_name" content="Nome da Marca" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={canonicalURL} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={fullImageUrl} />

    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### 2.2. Regras para Títulos e Descrições

#### **Título (Title Tag)**
- ✅ **Comprimento**: 50-60 caracteres
- ✅ **Formato**: `Palavra-Chave Principal | Palavra-Chave Secundária | Marca`
- ✅ **Inclua**: Localização (se aplicável) + Ação/Benefício
- ❌ **Evite**: Keyword stuffing, ALL CAPS, excesso de emojis

**Exemplos:**
```
✅ "Depilação Laser em Lisboa | Clínica XYZ"
✅ "Desenvolvedor Web Freelance | Porto | João Silva"
✅ "Receitas Veganas Fáceis | Blog Culinária Verde"
❌ "Melhor Clínica de Estética Lisboa Porto Oeiras Cascais"
```

#### **Descrição (Meta Description)**
- ✅ **Comprimento**: 150-160 caracteres
- ✅ **Inclua**: Proposta de valor + Call-to-action
- ✅ **Use**: Verbos de ação (Descubra, Agende, Aprenda, Transforme)
- ✅ **Seja específico**: Números, benefícios concretos

**Exemplos:**
```
✅ "Especialistas em depilação laser em Lisboa. Resultados garantidos com tecnologia avançada. Agende sua avaliação gratuita hoje."
✅ "Aprenda desenvolvimento web com tutoriais práticos e projetos reais. +50 aulas gratuitas. Comece agora!"
```

---

## 3. Schema.org (Structured Data)

### 3.1. Para Negócios Locais (LocalBusiness / BeautySalon / Restaurant)

Adicione ao `<head>` do seu Layout:

```astro
---
// ... (props anteriores)

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon", // Ajuste: Restaurant, Store, MedicalClinic, etc.
  "name": "Nome do Negócio",
  "description": "Descrição detalhada do negócio",
  "image": fullImageUrl,
  "url": siteUrl,
  "telephone": "+351912345678",
  "priceRange": "€€", // €, €€, €€€, ou $$, $$$
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Exemplo, 123",
    "addressLocality": "Lisboa",
    "addressRegion": "Lisboa",
    "postalCode": "1000-001",
    "addressCountry": "PT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "38.736946",
    "longitude": "-9.142685"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/seu-perfil",
    "https://instagram.com/seu-perfil",
    "https://linkedin.com/company/seu-perfil"
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Lisboa"
    },
    {
      "@type": "City",
      "name": "Cascais"
    }
  ]
};
---

<head>
  <!-- ... outras meta tags ... -->
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema)} />
</head>
```

### 3.2. Para Blogs e Artigos (BlogPosting)

```javascript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Título do Artigo",
  "image": fullImageUrl,
  "datePublished": "2026-05-06T10:00:00+00:00",
  "dateModified": "2026-05-06T15:30:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Nome do Autor",
    "url": "https://seu-site.com/sobre"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nome do Site",
    "logo": {
      "@type": "ImageObject",
      "url": "https://seu-site.com/logo.png"
    }
  },
  "description": "Descrição do artigo"
};
```

### 3.3. Para Produtos (Product)

```javascript
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nome do Produto",
  "image": fullImageUrl,
  "description": "Descrição do produto",
  "brand": {
    "@type": "Brand",
    "name": "Nome da Marca"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://seu-site.com/produto",
    "priceCurrency": "EUR",
    "price": "99.99",
    "availability": "https://schema.org/InStock"
  }
};
```

### 3.4. Como Encontrar Coordenadas GPS

1. Acesse [Google Maps](https://maps.google.com)
2. Pesquise seu endereço
3. Clique direito no marcador → "O que há aqui?"
4. Copie as coordenadas (formato: 38.736946, -9.142685)

---

## 4. Sitemap XML

### 4.1. Instalação e Configuração

Já instalado no passo 1.2. O sitemap será gerado automaticamente em `/sitemap-index.xml` após o build.

### 4.2. Configuração Avançada (Opcional)

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://seu-dominio.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'), // Excluir páginas
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
});
```

### 4.3. Verificar o Sitemap

Após build (`npm run build`), acesse:
```
dist/sitemap-index.xml
dist/sitemap-0.xml
```

---

## 5. Robots.txt

### 5.1. Crie `public/robots.txt`

```txt
# Robots.txt - [Nome do Site]
# https://seu-dominio.com

User-agent: *
Allow: /

# Bloqueie diretórios privados (se aplicável)
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# Sitemap
Sitemap: https://seu-dominio.com/sitemap-index.xml
```

### 5.2. Regras Comuns

```txt
# Bloquear motores de busca específicos
User-agent: GPTBot
Disallow: /

# Permitir apenas Google
User-agent: *
Disallow: /

User-agent: Googlebot
Allow: /
```

---

## 6. Otimização de Conteúdo

### 6.1. Estrutura de Headings (H1-H6)

```astro
<!-- ❌ ERRADO -->
<h1>Bem-vindo!</h1>
<h3>Sobre nós</h3>
<h2>Serviços</h2>

<!-- ✅ CORRETO -->
<h1>Clínica de Estética em Lisboa | Depilação Laser</h1>
<section>
  <h2>Nossos Serviços de Estética</h2>
  <h3>Depilação a Laser</h3>
  <h3>Tratamentos Faciais</h3>
</section>
<section>
  <h2>Sobre a Clínica</h2>
</section>
```

**Regras:**
- ✅ **Apenas UM H1 por página**
- ✅ **H1 deve conter palavras-chave principais**
- ✅ **Hierarquia lógica**: H1 → H2 → H3 (não pule níveis)
- ✅ **Use palavras-chave nos H2 e H3**

### 6.2. Alt Text em Imagens

```astro
<!-- ❌ ERRADO -->
<img src="/foto.jpg" alt="foto">
<img src="/clinic.jpg" alt="Imagem 1">

<!-- ✅ CORRETO -->
<img 
  src="/clinic-interior.jpg" 
  alt="Interior moderno da Clínica XYZ em Lisboa com sala de tratamento"
  width="1200"
  height="800"
  loading="lazy"
/>
```

**Regras:**
- ✅ **Seja descritivo** (50-125 caracteres)
- ✅ **Inclua contexto e localização**
- ✅ **Use palavras-chave naturalmente**
- ✅ **Sempre inclua width e height**
- ✅ **Use loading="lazy"** (exceto hero images)

### 6.3. Links Internos

```astro
<!-- Use IDs semânticos para ancoragem -->
<section id="servicos">
  <h2>Serviços</h2>
</section>

<nav>
  <a href="#servicos">Ver Serviços</a>
  <a href="/sobre">Sobre Nós</a>
  <a href="/contacto">Contacto</a>
</nav>
```

### 6.4. Estrutura Semântica HTML5

```astro
<body>
  <header>
    <nav><!-- Menu principal --></nav>
  </header>
  
  <main>
    <section id="hero">
      <h1><!-- Título principal --></h1>
    </section>
    
    <section id="servicos">
      <h2>Serviços</h2>
      <article><!-- Cada serviço --></article>
    </section>
    
    <section id="sobre">
      <h2>Sobre</h2>
    </section>
  </main>
  
  <footer>
    <!-- Informações de contacto, links -->>
  </footer>
</body>
```

### 6.5. Densidade de Palavras-Chave

- ✅ **Palavra-chave principal**: 1-2% do conteúdo
- ✅ **Primeira aparição**: Nos primeiros 100 palavras
- ✅ **Use variações naturais**: sinônimos, plurais
- ❌ **Evite keyword stuffing**

**Exemplo:**
```txt
Título: Clínica de Estética em Lisboa
H1: Tratamentos de Estética Avançada em Lisboa
Primeiro parágrafo: "Nossa clínica oferece tratamentos estéticos..."
H2: Depilação Laser na Grande Lisboa
Conteúdo: Variações como "tratamentos faciais", "cuidados estéticos", etc.
```

---

## 7. Imagem Open Graph

### 7.1. Especificações

Crie `public/og-image.jpg`:

- **Dimensões**: 1200 x 630 pixels (proporção 1.91:1)
- **Formato**: JPG ou PNG
- **Peso**: < 1MB (otimizado)
- **Conteúdo**:
  - Logo da marca
  - Título/slogan curto
  - Palavras-chave visuais
  - Fundo com cores da marca

### 7.2. Ferramentas para Criar

1. **Canva**: [canva.com](https://canva.com) - Templates gratuitos "Open Graph"
2. **Figma**: [figma.com](https://figma.com) - Design personalizado
3. **PhotoPea**: [photopea.com](https://photopea.com) - Photoshop online grátis

### 7.3. Template Básico (Texto)

```
┌─────────────────────────────────────────┐
│                                         │
│         [LOGO]                          │
│                                         │
│    Título do Site em Destaque          │
│    Breve Descrição ou Slogan           │
│                                         │
│    Palavra-Chave 1 · Palavra-Chave 2   │
│                                         │
│         seu-dominio.com                 │
│                                         │
└─────────────────────────────────────────┘
```

---

## 8. Checklist Final

Antes de fazer deploy, verifique:

### 8.1. Arquivos Essenciais

- [ ] `astro.config.mjs` com `site:` configurado
- [ ] `src/layouts/Layout.astro` com todas meta tags
- [ ] `public/robots.txt` criado
- [ ] `public/og-image.jpg` (1200x630px)
- [ ] `public/favicon.svg` ou `.ico`
- [ ] `@astrojs/sitemap` instalado

### 8.2. Meta Tags

- [ ] `<title>` único e otimizado (50-60 chars)
- [ ] `<meta name="description">` (150-160 chars)
- [ ] `<link rel="canonical">` em todas as páginas
- [ ] `<html lang="pt-PT">` (ou idioma correto)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Cards (twitter:card, twitter:image)

### 8.3. Conteúdo

- [ ] Apenas um `<h1>` por página
- [ ] H1 contém palavras-chave principais
- [ ] Todas as imagens têm `alt` descritivo
- [ ] Imagens têm `width` e `height`
- [ ] Links internos para navegação
- [ ] Estrutura semântica (header, main, section, footer)

### 8.4. Schema.org

- [ ] JSON-LD implementado no `<head>`
- [ ] Tipo correto (@type: LocalBusiness, Article, etc.)
- [ ] Informações completas (endereço, telefone, horário)
- [ ] Links sociais em `sameAs`

### 8.5. Tecnical SEO

- [ ] Sitemap gerado (`/sitemap-index.xml`)
- [ ] Robots.txt com referência ao sitemap
- [ ] URLs limpas (sem parâmetros desnecessários)
- [ ] HTTPS habilitado (após deploy)

---

## 9. Ferramentas de Validação

### 9.1. Após Deploy, Teste:

#### **Google Rich Results Test**
```
https://search.google.com/test/rich-results
```
- Valida Schema.org
- Mostra preview dos rich snippets

#### **Schema.org Validator**
```
https://validator.schema.org/
```
- Valida sintaxe JSON-LD
- Identifica erros

#### **Facebook Sharing Debugger**
```
https://developers.facebook.com/tools/debug/
```
- Testa Open Graph tags
- Mostra preview de compartilhamento
- ⚠️ Use "Scrape Again" para atualizar cache

#### **Twitter Card Validator**
```
https://cards-dev.twitter.com/validator
```
- Valida Twitter Cards
- Preview de compartilhamento

#### **Google PageSpeed Insights**
```
https://pagespeed.web.dev/
```
- Performance (Core Web Vitals)
- Recomendações de otimização
- Score SEO

#### **Lighthouse (Chrome DevTools)**
```
1. Abra Chrome DevTools (F12)
2. Aba "Lighthouse"
3. Selecione "SEO" + "Performance"
4. Click "Generate report"
```

### 9.2. Validadores Locais (Antes do Deploy)

#### **HTML Validator**
```
https://validator.w3.org/
```

#### **Verificar robots.txt**
```
https://seu-dominio.com/robots.txt
```

#### **Verificar sitemap**
```
https://seu-dominio.com/sitemap-index.xml
```

---

## 10. Monitoramento Pós-Deploy

### 10.1. Google Search Console (ESSENCIAL)

#### Configuração:
1. Acesse: [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione propriedade (URL prefix: `https://seu-dominio.com`)
3. Verifique propriedade:
   - **Via DNS**: Adicione registro TXT
   - **Via HTML**: Upload arquivo no `public/`
   - **Via Tag HTML**: Adicione meta tag no `<head>`
4. Submeta sitemap:
   - Sitemaps → "Add new sitemap"
   - URL: `https://seu-dominio.com/sitemap-index.xml`
5. Solicite indexação:
   - URL Inspection → Cole URL da homepage
   - "Request Indexing"

#### Monitorar:
- **Performance**: Impressões, cliques, CTR, posição média
- **Coverage**: Páginas indexadas vs. erros
- **Core Web Vitals**: LCP, FID, CLS
- **Mobile Usability**: Problemas em dispositivos móveis

### 10.2. Google Analytics 4 (Recomendado)

#### Instalação rápida:

```astro
---
// src/layouts/Layout.astro
const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_ID; // G-XXXXXXXXXX
---

<head>
  <!-- ... outras meta tags ... -->
  
  {GA_MEASUREMENT_ID && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
      <script is:inline define:vars={{ GA_MEASUREMENT_ID }}>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
      </script>
    </>
  )}
</head>
```

#### `.env`:
```
PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 10.3. Google Business Profile (Para Negócios Locais)

1. Acesse: [business.google.com](https://business.google.com)
2. Crie/reivindique perfil
3. Preencha informações:
   - Nome, endereço, telefone (NAP consistency)
   - Categorias (escolha até 10)
   - Horário de funcionamento
   - Fotos (mínimo 10)
   - Descrição (750 caracteres)
4. Verifique endereço (cartão postal)
5. Solicite avaliações de clientes

### 10.4. Métricas a Acompanhar

#### **Curto Prazo (1-4 semanas)**
- [ ] Site indexado no Google
- [ ] Sitemap processado sem erros
- [ ] Schema.org sem avisos
- [ ] Core Web Vitals "Good"

#### **Médio Prazo (1-3 meses)**
- [ ] Ranking para palavras-chave principais
- [ ] CTR > 2% no Search Console
- [ ] Impressões crescendo
- [ ] Páginas indexadas estáveis

#### **Longo Prazo (3-6 meses)**
- [ ] Top 3 para palavras-chave locais
- [ ] Tráfego orgânico crescente
- [ ] Conversões (formulários, chamadas)
- [ ] Backlinks de qualidade

---

## 🎯 Resumo: Implementação em 30 Minutos

### Passo a Passo Rápido:

```bash
# 1. Instalar sitemap
npm install @astrojs/sitemap

# 2. Configurar astro.config.mjs
# Adicione: site: 'https://seu-dominio.com' + integrations: [sitemap()]

# 3. Atualizar Layout.astro
# Copie template da seção 2.1

# 4. Adicionar Schema.org
# Copie template da seção 3.1 (ajuste para seu tipo de negócio)

# 5. Criar robots.txt
# Copie template da seção 5.1 para public/robots.txt

# 6. Criar og-image.jpg
# 1200x630px em public/og-image.jpg

# 7. Otimizar H1
# Adicione palavras-chave principais

# 8. Build e teste
npm run build
# Verifique: dist/sitemap-index.xml e dist/robots.txt

# 9. Deploy

# 10. Pós-deploy
# - Google Search Console
# - Submeter sitemap
# - Solicitar indexação
```

---

## 📚 Recursos Adicionais

### Documentação Oficial:
- [Astro SEO](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Google Search Central](https://developers.google.com/search/docs)
- [Schema.org Documentation](https://schema.org/docs/schemas.html)
- [Open Graph Protocol](https://ogp.me/)

### Ferramentas Úteis:
- [Ahrefs Keyword Generator](https://ahrefs.com/keyword-generator) - Pesquisa de palavras-chave
- [Answer The Public](https://answerthepublic.com/) - Ideias de conteúdo
- [Google Keyword Planner](https://ads.google.com/keywordplanner) - Volume de buscas
- [TinyPNG](https://tinypng.com/) - Otimização de imagens
- [Screaming Frog](https://www.screamingfrogseoseo.co.uk/) - Auditoria SEO

### Leitura Recomendada:
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Ahrefs Blog](https://ahrefs.com/blog/) - Estratégias avançadas

---

## ⚠️ Erros Comuns a Evitar

### ❌ Não fazer isso:

1. **Keyword Stuffing**
   ```html
   <!-- ERRADO -->
   <h1>Clínica Estética Lisboa Clínica Estética Lisboa Estética Lisboa</h1>
   ```

2. **Títulos Genéricos**
   ```html
   <!-- ERRADO -->
   <title>Home | Meu Site</title>
   
   <!-- CORRETO -->
   <title>Depilação Laser em Lisboa | Clínica XYZ</title>
   ```

3. **Esquecer Canonical URLs**
   ```html
   <!-- Sempre inclua -->
   <link rel="canonical" href="https://seu-dominio.com/pagina" />
   ```

4. **Imagens sem Alt**
   ```html
   <!-- ERRADO -->
   <img src="/foto.jpg">
   
   <!-- CORRETO -->
   <img src="/foto.jpg" alt="Descrição detalhada da imagem" width="800" height="600">
   ```

5. **Duplicar Conteúdo**
   - Não copie textos de outros sites
   - Use canonical para páginas similares
   - Crie conteúdo único e valioso

6. **Ignorar Mobile**
   - Sempre teste em dispositivos móveis
   - Use design responsivo
   - Otimize velocidade de carregamento

---

## 📊 Template de Relatório SEO

Use esta estrutura para documentar SEO em projetos:

```markdown
# Relatório SEO - [Nome do Projeto]

## Status
- [x] Meta tags configuradas
- [x] Schema.org implementado
- [x] Sitemap gerado
- [x] Robots.txt criado
- [ ] Google Search Console configurado
- [ ] Analytics instalado

## Palavras-Chave Alvo
1. **Principal**: [palavra-chave]
2. **Secundárias**: [lista]
3. **Long-tail**: [lista]

## URLs Importantes
- Site: https://seu-dominio.com
- Sitemap: https://seu-dominio.com/sitemap-index.xml
- Google Search Console: [link]

## Métricas Baseline
- Data: [data]
- Páginas indexadas: 0
- Posição média: N/A
- Impressões/mês: 0

## Próximas Ações
1. [ ] Criar conteúdo para blog
2. [ ] Otimizar imagens
3. [ ] Conseguir backlinks
4. [ ] Adicionar FAQ schema
```

---

## 🚀 Conclusão

Seguindo este guia, você terá:

✅ **Fundação sólida de SEO técnico**  
✅ **Rich snippets no Google**  
✅ **Compartilhamento social otimizado**  
✅ **Ranking melhorado em 4-8 semanas**  
✅ **Ferramentas para monitorar progresso**  

**Lembre-se:** SEO é um processo contínuo. Continue criando conteúdo de qualidade, otimizando páginas e monitorando métricas.

---

**Criado em:** Maio 2026  
**Baseado em:** Projeto Concept Estética (conceptestetica.pt)  
**Versão:** 1.0
