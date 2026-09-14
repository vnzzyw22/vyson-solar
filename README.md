# Vysão Solar — Site

Site institucional da Vysão Solar (Maringá — PR), construído a partir do documento de direção
`VYSAO-SOLAR-DESIGN-DIRECTION.md`.

## Stack

- React + TypeScript + Vite
- React Router (rota única extra: `/politica-de-privacidade`)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion (animações gerais de scroll; respeita `prefers-reduced-motion` via `MotionConfig`)
- GSAP ScrollTrigger (apenas na seção Processo, pinned scroll — desktop only; carregado sob
  demanda via `React.lazy`, não entra no bundle principal)

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Deploy

Hospedado no Vercel. `vercel.json` já tem o rewrite de SPA necessário para a rota
`/politica-de-privacidade` funcionar em produção (sem isso, acessar a URL direto dá 404).

```bash
npx vercel          # deploy de preview
npx vercel --prod    # deploy de produção
```

## Assets de marca

A logo oficial está em `src/assets/logo-vysao/`:

- `logo-vysao.jpg` — arquivo original enviado pelo cliente (com fundo).
- `icon.webp` (fonte: `logo-icon-cutout.png`) — símbolo do olho isolado, fundo removido. Usado no
  nav, rodapé (lockup pequeno + marca d'água gigante em silhueta) e nos favicons.
- `wordmark.webp` (fonte: `wordmark-cutout.png`) — "VYSÃO SOLAR" na tipografia real da logo
  (efeito textura de painel solar), fundo removido. Usado no nav (cor original) e no rodapé
  (convertido pra branco via CSS `filter: brightness(0) invert(1)`, já que a cor original quase
  não tem contraste sobre o fundo navy do rodapé).
- `logo-full-cutout.png` — lockup completo (ícone + wordmark + tagline), fundo removido, mantido
  como fonte para uso futuro (redes sociais, materiais impressos); não é usado no layout do site.

Todos gerados por remoção de fundo automática (luminância/saturação) a partir do JPG original, já
que ele não veio com fundo transparente. Se a Vysão fornecer arquivos vetoriais/PNG-transparente
no futuro, podem substituir os cutouts diretamente sem mudar o código dos componentes.

## SEO / Analytics / LGPD

- Meta tags Open Graph/Twitter, `robots.txt`, `sitemap.xml` e JSON-LD (`LocalBusiness`) já
  configurados em `index.html` — todos com **TODO marcado no próprio arquivo** apontando pra URL
  temporária do Vercel; trocar pelo domínio final quando o DNS de `vysaosolar.com.br` for
  apontado (são 3 arquivos: `index.html`, `public/robots.txt`, `public/sitemap.xml`).
- Imagem de compartilhamento (`public/og-image.jpg`, 1200×630) já gerada com a identidade do site.
- Google Analytics (GA4) e Meta Pixel estão implementados em `src/lib/analytics.ts`, mas com
  **IDs placeholder** (`G-XXXXXXXXXX` e `0000000000000000`) — nesse estado eles não carregam
  nada (só logam um aviso no console). Assim que as contas forem criadas, troque os dois
  `const` no topo do arquivo pelos IDs reais.
- Banner de cookies (`src/components/CookieConsent.tsx`) e Política de Privacidade
  (`/politica-de-privacidade`) já implementados — analytics só carrega depois que a pessoa clica
  em "Aceitar"; a escolha fica salva em `localStorage`.

## Acessibilidade / Performance

- Foco de teclado visível em todo elemento interativo (`:focus-visible` em azul elétrico,
  `src/index.css`).
- GSAP (usado só na seção Processo) é carregado em chunk separado, não entra no bundle principal.
- Imagens em WebP, com `loading="lazy"` abaixo da dobra inicial.

## Pendências antes de publicar

- **Números fictícios**: os contadores da seção Sobre e as estatísticas dos Cases em
  `src/content.ts` usam valores fictícios plausíveis (marcados com `// TODO: números fictícios`
  no arquivo) para preencher o layout — substituir pelos números reais antes de publicar de
  verdade, mesmo que não apareçam como "a confirmar" na tela.
- Imagem de hero dedicada e condições de pagamento seguem pendentes (ver Seção 4/8 do documento
  de direção) — a logo real já foi integrada.
- Trocar os logos de fornecedores placeholder na faixa de parceiros (`src/components/Partners.tsx`).
- Comprar/apontar o domínio `vysaosolar.com.br` e atualizar as 3 URLs marcadas com TODO (SEO).
- Criar as contas Google Analytics / Meta Pixel e trocar os IDs placeholder.

Ver `VYSAO-SOLAR-DESIGN-DIRECTION.md` na raiz do repositório para o documento completo de direção
de design e critérios de aprovação.
