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

**Site em produção: https://vysaosolar.netlify.app** (sem hífen entre "vysao" e "solar" — atenção
pra não confundir com `vysao-solar.netlify.app`, que não existe e dá 404). Project ID
`7daa4528-ee15-4c5e-9888-dc38504b8f99`, conta `vbcs2009@gmail.com`, time "vbcs2009's team". Público,
sem proteção de acesso (checado em 2026-09-15 com `curl` — HTTP 200 direto, sem tela de login).

Deploy é **manual via CLI**, não é conectado ao GitHub (push não redeploya sozinho — precisa rodar
os comandos abaixo depois de cada mudança que for pra produção). Não tem `netlify.toml`; o comando
de build (`npm run build`, publish dir `dist`) foi auto-detectado na primeira vez.

```bash
npx netlify-cli login              # só na primeira vez / máquina nova
npx netlify-cli link --id 7daa4528-ee15-4c5e-9888-dc38504b8f99   # idem
npm run build
npx netlify-cli deploy --prod --dir=dist
```

Também existe `vercel.json` no repo (rewrite de SPA pra `/politica-de-privacidade` não dar 404),
preparado caso decidam migrar ou espelhar no Vercel no futuro — mas isso **nunca foi publicado**;
não confundir com um site real. Se for usado: `npx vercel --prod`.

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
  configurados em `index.html`, apontando pra URL real em produção
  (`https://vysaosolar.netlify.app`) — todos com **TODO marcado no próprio arquivo**; trocar pelo
  domínio final quando o DNS de `vysaosolar.com.br` for apontado (são 3 arquivos: `index.html`,
  `public/robots.txt`, `public/sitemap.xml`).
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
- Condições de pagamento seguem pendentes (ver Seção 8 do documento de direção) — a logo real e a
  imagem/vídeo de hero já foram integrados.
- Comprar/apontar o domínio `vysaosolar.com.br` e atualizar as 3 URLs marcadas com TODO (SEO).
- Criar as contas Google Analytics / Meta Pixel e trocar os IDs placeholder.
- Testar em iPhone real (Safari) — GSAP ScrollTrigger e o `backdrop-blur` da nav têm histórico de
  comportamento diferente no Safari.

## Log de decisões técnicas recentes (2026-09-14)

- **Hero**: `IMAGES.hero` era literalmente byte-idêntico a `case-rural.webp` (bug de duplicação).
  Removido; hero agora usa `src/components/HeroBackground.tsx` — vídeo em loop
  (`public/vysao-hero-video-nuvens.mp4`) com dois `<video>` alternados fazendo crossfade de 0.45s
  no fechamento do loop (esconde a costura do corte seco), poster `public/vysao-hero-sem-marca-dagua.jpg`
  como base sempre visível, e respeita `prefers-reduced-motion` via o hook `useReducedMotion`.
- **Nav bar**: decisão final é **barra única** — logo, links e CTA "Simular economia" no mesmo
  container com fundo compartilhado (glassmorphism: `bg-cream/20` + `backdrop-blur-[18px]`, item
  ativo com cápsula amarela via `layoutId` do Framer Motion). Chegou a existir uma variante com os
  3 elementos como pílulas flutuantes independentes (sem fundo compartilhado) — foi revertida a
  pedido do cliente, não repetir essa variante sem pedido explícito. Menu tem só
  Sobre/Processo/Serviços/FAQ ("Cases" foi removido do menu, mas a seção continua na página).
- **Logo** (`src/assets/logo-vysao/icon.webp`): tinha fundo branco sólido embutido na própria
  imagem (não CSS) — corrigido para fundo transparente via processamento de canal alfa.
- `color-scheme: light only` foi adicionado em `index.html` (meta tag) e `src/index.css` porque o
  modo escuro forçado do navegador/SO quebra o glassmorphism da nav (o navegador recolore
  elementos individualmente sem entender `backdrop-filter`, fragmentando a barra visualmente). Não
  remover essa declaração.
- **Fornecedores homologados** (`src/components/Partners.tsx`): trocados os `<span>` de texto por
  `<img>` reais em `public/fornecedores/` — Canadian Solar, Growatt, Fronius, WEG. Todas com
  `h-10 w-auto object-contain` (altura fixa, sem distorção) e `opacity-70 hover:opacity-100` — SEM
  `grayscale`, o cliente pediu para manter as cores originais de cada marca. BYD e Deye foram
  removidos da lista (não vão ter logo, por decisão do cliente — não adicionar de volta sem
  pedido). O arquivo original de `weg-fornecedor.png` era a versão reversa da marca (glifo branco
  vazado em fundo navy sólido) — reconstruído como versão positiva (glifo navy sobre transparente)
  porque a versão branca ficaria invisível sobre a seção `bg-cream`. `growatt.jpg` teve o excesso
  de espaço em branco cortado (export original vinha com bastante padding).

Ver `VYSAO-SOLAR-DESIGN-DIRECTION.md` na raiz do repositório para o documento completo de direção
de design e critérios de aprovação.
