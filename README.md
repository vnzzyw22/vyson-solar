# Vysão Solar — Site

Site institucional da Vysão Solar (Maringá — PR), construído a partir do documento de direção
`VYSAO-SOLAR-DESIGN-DIRECTION.md`.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion (animações gerais de scroll)
- GSAP ScrollTrigger (apenas na seção Processo, pinned scroll — desktop only)

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Assets de marca

A logo oficial está em `src/assets/logo-vysao/`:

- `logo-vysao.jpg` — arquivo original enviado pelo cliente (com fundo).
- `logo-icon-cutout.png` / `icon.webp` — símbolo do olho isolado, fundo removido (usado no nav,
  rodapé e favicon). Gerado por remoção de fundo automática (luminância/saturação) a partir do
  original — se a Vysão fornecer um arquivo com fundo já transparente no futuro, pode substituir
  este diretamente.
- `logo-full-cutout.png` — lockup completo (ícone + "VYSÃO SOLAR" + tagline), fundo removido,
  mantido como fonte para uso futuro (ex: redes sociais, materiais impressos); não é usado no
  site hoje porque o wordmark do site usa tipografia set (Sora), não o lettering do arquivo
  original, por consistência com o resto da tipografia do site.

## Pendências antes de publicar

- Confirmar e preencher os números marcados como `(a confirmar)` em `src/content.ts`
  (contadores da seção Sobre e estatísticas dos Cases).
- Trocar os logos de fornecedores placeholder na faixa de parceiros (`src/components/Partners.tsx`).
- Decidir domínio/hospedagem.

Ver `VYSAO-SOLAR-DESIGN-DIRECTION.md` na raiz do repositório (se presente) para o documento
completo de direção de design e critérios de aprovação.
