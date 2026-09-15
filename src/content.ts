export const CONTACT = {
  phones: ['(44) 99892-7552', '(44) 99808-6998'],
  whatsapp: '5544998927552',
  address: 'Av. Morangueira, 396 — Vila Santo Antônio, Maringá — PR',
  instagram: '@vysaosolar',
  instagramUrl: 'https://instagram.com/vysaosolar',
}

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
}

export const NAV_LINKS = [
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Processo', href: '/#processo' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'FAQ', href: '/#faq' },
]

// TODO: números fictícios, confirmar com cliente (só "+100 projetos" é real, per
// VYSAO-SOLAR-DESIGN-DIRECTION.md Seção 8). Os demais são placeholders plausíveis
// pedidos pelo cliente para preencher o layout — substituir antes de publicar.
export const ABOUT_STATS = [
  { value: 100, suffix: '+', label: 'projetos realizados' },
  { value: 12, suffix: '', label: 'anos de mercado' },
  { value: 850, suffix: ' kWp', label: 'instalados' },
  { value: 97, suffix: '%', label: 'de satisfação' },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Projeto',
    text: 'Analisamos seu perfil de consumo e dimensionamos o sistema exato para sua necessidade, sem desperdício.',
  },
  {
    number: '02',
    title: 'Instalação',
    text: 'Equipe própria cuida de toda a instalação e da homologação junto à concessionária.',
  },
  {
    number: '03',
    title: 'Pós-venda',
    text: 'Monitoramento contínuo e suporte para garantir performance ao longo dos anos.',
  },
]

export const SERVICES = [
  {
    id: 'residencial',
    tag: 'Residencial',
    title: 'Energia solar residencial',
    text: 'Reduza sua conta de luz com um sistema projetado para o seu consumo real.',
    image: 'residencial',
  },
  {
    id: 'comercial-industrial',
    tag: 'Comercial & Industrial',
    title: 'Energia para o seu negócio',
    text: 'Sistemas de alta escala com retorno projetado e engenharia sob medida.',
    image: 'comercial-industrial',
  },
  {
    id: 'rural',
    tag: 'Rural',
    title: 'Energia para o seu agronegócio',
    text: 'Autossuficiência energética para propriedades, irrigação e produção.',
    image: 'rural',
  },
] as const

export const FAQ_ITEMS = [
  {
    q: 'Quanto posso economizar com energia solar?',
    a: 'Depende do seu perfil de consumo e da estrutura disponível, mas a maioria dos nossos clientes chega a reduzir de forma significativa a conta de luz já a partir do primeiro mês de operação do sistema. Fazemos uma simulação personalizada antes de qualquer proposta.',
  },
  {
    q: 'Preciso quebrar meu telhado para instalar?',
    a: 'Não. A estrutura de fixação é projetada para o tipo específico do seu telhado (cerâmico, metálico, laje, fibrocimento) sem necessidade de quebra — apenas furos pontuais e vedação adequada.',
  },
  {
    q: 'Se a concessionária ficar sem energia, eu continuo com luz?',
    a: 'Em sistemas on-grid convencionais (a maioria dos nossos projetos), não — por segurança da rede, o sistema desliga automaticamente durante quedas. Para quem precisa de autonomia total, avaliamos soluções com baterias caso a caso.',
  },
  {
    q: 'O sistema funciona em dias nublados ou chuvosos?',
    a: 'Sim, os painéis continuam gerando energia em dias nublados, com produção reduzida em relação a dias de sol pleno. O dimensionamento do sistema já considera a média de irradiação da região ao longo do ano.',
  },
  {
    q: 'Qual é a vida útil dos painéis solares?',
    a: 'Os painéis têm vida útil média de 25 a 30 anos, com garantia de performance do fabricante ao longo desse período. Inversores costumam ter garantia entre 10 e 15 anos.',
  },
  {
    q: 'A Vysão cuida da homologação com a concessionária?',
    a: 'Sim. Cuidamos de todo o processo técnico e burocrático junto à concessionária, do projeto elétrico à vistoria final, para que o sistema seja aprovado sem dor de cabeça para você.',
  },
  {
    q: 'Quais as condições de pagamento?',
    a: 'Trabalhamos com financiamento em até 48x pelo Santander e até 24x pelos demais bancos parceiros, além de pagamento à vista com condições especiais. As condições podem variar conforme análise de crédito.',
  },
]
