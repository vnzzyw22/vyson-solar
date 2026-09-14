import { useEffect } from 'react'
import { CONTACT } from '../content'

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-cream px-4 pb-24 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-3 text-sm text-navy/50">Última atualização: 14 de setembro de 2026.</p>

        <div className="prose-vysao mt-10 space-y-8 text-[15px] leading-relaxed text-navy/75 sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-navy">1. Quem somos</h2>
            <p className="mt-2">
              Esta política se aplica ao site da Vysão Solar ("nós"), empresa de venda, projeto,
              instalação e manutenção de sistemas de energia solar fotovoltaica com sede em Maringá
              — PR, no endereço {CONTACT.address}. Somos os controladores dos dados tratados através
              deste site, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">2. Quais dados coletamos</h2>
            <p className="mt-2">Coletamos duas categorias de dados através deste site:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-navy">Dados de navegação</strong> — coletados
                automaticamente por cookies e tecnologias semelhantes (Google Analytics e Meta
                Pixel), como páginas visitadas, tempo de permanência, origem do acesso e
                interações com botões e links. Esses dados são coletados de forma agregada e não
                identificam você diretamente.
              </li>
              <li>
                <strong className="text-navy">Dados de contato</strong> — quando você clica em um
                botão como "Simular economia" e nos escreve pelo WhatsApp, os dados que você
                compartilha diretamente conosco (nome, telefone, endereço, consumo de energia
                etc.) passam a ser tratados por nós para fins comerciais. Esse contato acontece na
                plataforma do WhatsApp, sujeita também à política de privacidade da Meta.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">3. Cookies e tecnologias de rastreamento</h2>
            <p className="mt-2">Utilizamos, ou podemos utilizar, as seguintes ferramentas:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-navy">Google Analytics</strong> — para entender como os
                visitantes usam o site (páginas mais vistas, dispositivo, origem do tráfego) e
                melhorar a experiência.
              </li>
              <li>
                <strong className="text-navy">Meta Pixel</strong> — para medir a efetividade de
                campanhas de anúncio no Instagram e Facebook e, quando aplicável, exibir anúncios
                mais relevantes para quem já visitou o site.
              </li>
            </ul>
            <p className="mt-2">
              Essas ferramentas só são carregadas depois que você aceita cookies no aviso exibido
              na primeira visita. Você pode recusar a qualquer momento limpando os dados de
              navegação do seu navegador, ou revisitando essa escolha limpando o armazenamento
              local (localStorage) deste site nas configurações do navegador.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">4. Com quem compartilhamos dados</h2>
            <p className="mt-2">
              Não vendemos seus dados. Compartilhamos dados de navegação com o Google (Google
              Analytics) e a Meta (Meta Pixel, WhatsApp) exclusivamente como operadores dessas
              ferramentas, nos limites de suas respectivas políticas de privacidade. Dados de
              contato comercial (nome, telefone etc.) são usados internamente pela nossa equipe
              comercial e não são repassados a terceiros para fins de marketing de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">5. Seus direitos</h2>
            <p className="mt-2">
              Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento: confirmação
              de que tratamos seus dados, acesso aos dados, correção de dados incompletos ou
              desatualizados, anonimização ou eliminação de dados desnecessários, portabilidade,
              informação sobre compartilhamento, e revogação do consentimento dado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">6. Como exercer seus direitos</h2>
            <p className="mt-2">
              Para exercer qualquer um desses direitos, entre em contato conosco pelo WhatsApp{' '}
              {CONTACT.phones[0]} ou pelos demais canais listados no rodapé deste site.
              Responderemos sua solicitação dentro de um prazo razoável.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">7. Segurança</h2>
            <p className="mt-2">
              Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados que
              tratamos contra acesso não autorizado, perda ou alteração indevida.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">8. Alterações nesta política</h2>
            <p className="mt-2">
              Podemos atualizar esta política periodicamente para refletir mudanças em nossas
              práticas ou em exigências legais. A data da última atualização está sempre indicada
              no topo desta página.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
