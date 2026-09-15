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

Hospedado na **Netlify** (não tem nada publicado no Vercel — `vercel.json` e os comandos `vercel`
abaixo ficaram no repo do scaffold inicial, mas não há deploy real lá, só documentado por engano
numa sessão anterior):

**https://vysao-solar.netlify.app** (project ID `7daa4528-ee15-4c5e-9888-dc38504b8f99`, conta
`vbcs2009@gmail.com`, time "vbcs2009's team"). Site criado em 2026-09-14 via `netlify-cli` (pra
contornar uma trava na interface web da Netlify). Não tem `netlify.toml` — o build (`npm run
build`, publish dir `dist`) foi auto-detectado. **Está com "Team protection" ativado** (recurso da
própria Netlify, padrão da conta) — a URL pública mostra "This site is private" até alguém
desativar isso manualmente em app.netlify.com → time → Team settings → Protection (não é
configurável via CLI).

```bash
netlify build
netlify deploy --prod --dir=dist
```

`vercel.json` já tem o rewrite de SPA que a rota `/politica-de-privacidade` precisaria num deploy
Vercel (sem isso, acessar a URL direto dá 404) — mantido só para o caso de um dia ser usado, mas
não reflete o estado real de hospedagem:

```bash
npx vercel          # deploy de preview (não usado atualmente)
npx vercel --prod    # deploy de produção (não usado atualmente)
```

## Simulador de economia

Seção `src/components/EconomiaSimulator.tsx` (`id="simulador"`), posicionada entre a Hero e a
seção Sobre. Slider de "conta média mensal" (R$ 100–10.000, `accent-sun` faz o handle/trilho
saírem amarelos automaticamente, sem precisar estilizar pseudo-elementos do input nativo) + select
de tipo de imóvel, com 3 resultados recalculados em tempo real (economia anual, redução média,
retorno estimado) **em azul-marinho, nunca amarelo** — regra do documento de direção (números são
informação, não ação). Fórmula é placeholder, marcada com `// TODO: validar fórmula real com o
cliente` no próprio arquivo — percentual de redução por tipo de imóvel e custo do sistema por
faixa de conta são chutes plausíveis, não uma proposta real. O CTA da seção manda direto pro
WhatsApp com os valores simulados na mensagem (não passa pelo modal de lead abaixo).

**Importante — o CTA "Simular economia" não se comporta igual em todo lugar do site**: no Hero ele
agora só rola suavemente até essa seção (`<a href="/#simulador">`, sem abrir modal); em Nav,
`MobileCTABar` e `CTAFooter` ele continua abrindo o modal de lead (próxima seção abaixo). Foi
assim que o cliente pediu — se um dia perguntar "por que o botão faz coisas diferentes", a
resposta é essa, não é inconsistência left over.

## Captura de lead (Netlify Forms)

O CTA "Simular economia" do Nav, `MobileCTABar` e `CTAFooter` (não o do Hero, ver acima) abre um
modal (`src/components/SimularEconomiaModal.tsx`, estado global via
`src/context/SimularEconomiaContext.tsx`) pedindo **nome, telefone, cidade, valor médio da conta
de luz (R$) e tipo de imóvel (Residencial/Comercial/Rural)** antes de redirecionar pro WhatsApp —
sem Supabase, sem backend próprio, usando **Netlify Forms**. Funciona no site real (Netlify,
acima). Só pararia de funcionar se o site fosse publicado em outro lugar sem suporte a Netlify
Forms (Vercel, por exemplo, não processaria o POST) — não é o caso hoje.

A mensagem final do WhatsApp segue um formato fixo definido em `buildWhatsappMessage`:

```
Olá! Meu nome é *{nome}*, sou de *{cidade}*.
Tenho interesse em simular economia com energia solar.

📍 Tipo de imóvel: {tipo_imovel}
💡 Valor médio da conta de luz: R$ {valor_conta}
📱 Telefone de contato: {telefone}
```

Como funciona:
- `index.html` tem um `<form name="simular-economia" data-netlify="true" hidden>` estático com os
  mesmos campos do modal — é assim que o Netlify detecta o formulário no build (ele lê o HTML
  gerado, não executa JS, então um form só-React não seria encontrado).
- No submit do modal, faz um `fetch('/', { method: 'POST', ... })` com
  `Content-Type: application/x-www-form-urlencoded` antes de redirecionar. Se falhar (rede ou
  status não-OK), loga no console e redireciona pro WhatsApp mesmo assim — nunca trava o usuário.
- A aba do WhatsApp é aberta de forma síncrona (`window.open` logo no clique, antes do `await` do
  fetch) para não ser bloqueada como pop-up pelo navegador; a URL final é só preenchida depois.

Onde ver os leads enviados: painel da Netlify → site → aba **Forms**.

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
  temporária da Netlify; trocar pelo domínio final quando o DNS de `vysaosolar.com.br` for
  apontado (são 3 arquivos: `index.html`, `public/robots.txt`, `public/sitemap.xml`).
- Imagem de compartilhamento (`public/og-image.jpg`, 1200×630, com logo e headline) já gerada e
  referenciada em `og:image`/`twitter:image` — confirmado que a prévia com imagem funciona ao
  compartilhar o link (WhatsApp etc. lêem essas meta tags).
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
- O vídeo da Hero (~4.6MB) **nunca é montado no mobile** (`useMediaQuery('(max-width: 767px)')`
  em `HeroBackground.tsx`, valor calculado de forma síncrona no primeiro render — não dá tempo do
  `<video preload="auto">` começar a baixar antes de decidir não montar) — só a imagem estática
  aparece, sempre, poupando dado móvel. Desktop continua com o vídeo em loop normalmente.

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
- Se quiser o site Netlify público sem login, desativar "Team protection" (ver seção Deploy acima).

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

## Log de decisões técnicas recentes (2026-09-15)

- **Correção Vercel → Netlify**: o README e as meta tags/`robots.txt`/`sitemap.xml` chegaram a
  documentar o Vercel como hospedagem "principal" e a Netlify como "espelho" — isso estava errado,
  nunca existiu deploy real no Vercel (só `vercel.json` de scaffold inicial). Netlify
  (`vysao-solar.netlify.app`) é o único deploy real; todas as URLs foram corrigidas.
- **Captura de lead**: adicionados 2 campos ao `SimularEconomiaModal` — "valor médio da conta de
  luz" (`valor_conta`, numérico) e "tipo de imóvel" (`tipo_imovel`, select Residencial/Comercial/
  Rural). Mensagem final do WhatsApp segue formato fixo com emojis (ver seção "Captura de lead"
  acima) — não é só uma listagem simples de campos, é um texto específico pedido pelo cliente, não
  reformatar sem pedido.
- **Vídeo da Hero no mobile**: nunca é carregado/montado abaixo de 768px (`useMediaQuery` com
  lazy initializer, ver seção Acessibilidade/Performance) — só a imagem estática. Antes disso o
  vídeo só era condicionado por `prefers-reduced-motion`, sem considerar viewport/dados móveis.
- **OG image**: confirmado que já estava tudo certo (`public/og-image.jpg`, 1200×630, com logo e
  headline, referenciada em `og:image`/`twitter:image`) — não precisou implementar nada novo.
- **Seção "Simulador de economia"** (`EconomiaSimulator.tsx`, `id="simulador"`) adicionada entre
  Hero e Sobre — ver seção própria acima. CTA do Hero mudou de "abre modal de lead" para "rola até
  o simulador"; os outros CTAs "Simular economia" do site continuam abrindo o modal.

Ver `VYSAO-SOLAR-DESIGN-DIRECTION.md` na raiz do repositório para o documento completo de direção
de design e critérios de aprovação.
