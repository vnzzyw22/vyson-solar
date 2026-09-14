import { useState } from 'react'
import { FAQ_ITEMS } from '../content'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-cream px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-navy sm:text-4xl">Perguntas frequentes</h2>

        <div className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-medium text-navy sm:text-lg">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center text-xl font-light text-navy/60 transition-transform duration-300"
                      style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-sm leading-relaxed text-navy/65 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
