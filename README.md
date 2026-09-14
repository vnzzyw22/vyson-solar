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

## Pendências antes de publicar

- Substituir o símbolo do olho placeholder (`src/components/Logo.tsx`) pela logo real tratada.
- Confirmar e preencher os números marcados como `(a confirmar)` em `src/content.ts`
  (contadores da seção Sobre e estatísticas dos Cases).
- Trocar os logos de fornecedores placeholder na faixa de parceiros (`src/components/Partners.tsx`).
- Decidir domínio/hospedagem.

Ver `VYSAO-SOLAR-DESIGN-DIRECTION.md` na raiz do repositório (se presente) para o documento
completo de direção de design e critérios de aprovação.
