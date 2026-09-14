const PLACEHOLDER_PARTNERS = [
  'Fornecedor 01',
  'Fornecedor 02',
  'Fornecedor 03',
  'Fornecedor 04',
  'Fornecedor 05',
  'Fornecedor 06',
]

/**
 * PLACEHOLDER — marcas reais de fornecedores a confirmar (Seção 3/13 do
 * documento de direção). Substituir por logos reais antes da publicação.
 */
export function Partners() {
  const items = [...PLACEHOLDER_PARTNERS, ...PLACEHOLDER_PARTNERS]

  return (
    <section className="border-y border-navy/10 bg-cream py-8">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/40">
          Equipamentos de fornecedores homologados
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />
        <div className="flex w-max animate-marquee gap-12 motion-reduce:animate-none">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap text-lg font-semibold tracking-tight text-navy/25"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
