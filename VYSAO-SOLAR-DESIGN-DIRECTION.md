# VYSÃO SOLAR — DESIGN & EXPERIENCE DIRECTION
### Documento-fonte de verdade para desenvolvimento do site
Referência estrutural: **Lumina — Solar Energy Immersive Website** (Behance, projeto conceitual)

---

## 1. IDENTIDADE DA MARCA

**Empresa:** Vysão Solar — Energia Solar Fotovoltaica
**Cidade-base:** Maringá — PR
**Instagram:** @vysaosolar

**Posicionamento:** "A Pioneira em Energia Solar de Maringá"
**Mensagem central:** "O sol paga a sua conta."

**Símbolo:** olho estilizado com íris composta por padrões tecnológicos (linhas circulares, esfera central tipo globo/painel) + raios de sol emergindo do canto superior direito. Assets tratados (fundo removido) disponíveis: logo completa e símbolo isolado do olho.

**Serviços:** venda, instalação, manutenção e projetos — residenciais, comerciais e rurais.

**Contatos:**
- (44) 99892-7552
- (44) 99808-6998
- Av. Morangueira, 396 — Vila Santo Antônio, Maringá — PR

---

## 2. PALETA FUNCIONAL

| Cor | Hex | Função | Regra |
|---|---|---|---|
| Azul Escuro | `#002350` | Fundo/estrutura | Equivalente ao preto da referência. Domina seções escuras. |
| Off-White | `#FFFDF0` | Superfície clara | Alterna com o azul escuro seção a seção. |
| Branco | `#FFFFFF` | Texto sobre fundo escuro / respiro | — |
| **Amarelo Sol** | `#FFB900` | **Único destaque/ação** | Aparece em exatamente 3 contextos: CTA, item ativo (nav/processo), número de resultado em case. Em nenhum outro lugar. |
| Azul Elétrico | `#0099FF` | Detalhe técnico | Só em linhas/traços/gráficos finos. Nunca em preenchimento sólido grande, nunca em botão. |

**Regra de ouro:** amarelo = interação/prova. Azul-marinho = informação passiva. Se uma cor está sendo usada só "porque fica bonito", está errada — cor aqui é função, não decoração.

---

## 3. TIPOGRAFIA

Sans-serif geométrica com suporte a múltiplos pesos, de uso livre comercial (ex: **Inter**, **Sora** ou **General Sans** — decidir no momento da implementação, mantendo o princípio abaixo).

**Princípio:** dentro da mesma headline, misturar peso regular e bold para criar ênfase (ex: "Muito além de painéis." em regular, "Entregamos energia que se paga sozinha." em bold) — em vez de usar cor para dar ênfase.

**Escala sugerida (desktop):** H1 hero 56-72px / H2 seção 36-44px / body 16-18px / números de destaque (cases, contadores) 48-64px.

---

## 4. DIREÇÃO FOTOGRÁFICA

**Atualização:** as fotos reais originais da Vysão (baixa resolução, recortadas de posts de redes sociais) foram substituídas por imagens geradas seguindo a mesma gramática visual do hero — drone, luz natural, identidade geográfica do Paraná — uma para cada segmento de serviço/case: Residencial, Comercial & Industrial e Rural. Isso resolve o problema de resolução E cria consistência visual entre hero, serviços e cases (todas as fotos "parecem a mesma sessão de fotos"), o que a referência também faz.

1. **Hero, Serviços e Cases (imagem gerada, consistente entre si):** cena aérea de drone, luz natural (golden hour ou meio de tarde conforme o segmento), propriedade/instalação no interior do Paraná com sistema fotovoltaico integrado — nunca painel "colado" na cena. Regra: identidade geográfica real, nunca cenário genérico.
2. **Fotos reais originais (`vysao-foto-real-comercial.png`, `vysao-foto-real-industrial-aerea.png`):** mantidas como material de apoio/reserva, baixa resolução — usar apenas se for necessário provar autenticidade em algum contexto específico (ex: prova social em conversa comercial), não como imagem principal do site.

Se uma nova imagem gerada for necessária em qualquer etapa futura, isso deve ser sinalizado antes de prosseguir — nunca gerar e publicar sem validação.

---

## 5. ARQUITETURA DA EXPERIÊNCIA

Ordem fixa de seções (mesmo arco narrativo da referência: desejo → autoridade → processo → segmentação → prova → objeção → urgência):

1. Nav fixa (pill flutuante)
2. Hero full-bleed
3. Faixa de parceiros/fornecedores `[PLACEHOLDER — marcas reais a confirmar]`
4. Sobre + contadores animados
5. Processo em 3 passos (pinned scroll): Projeto → Instalação → Pós-venda
6. Serviços segmentados (3 blocos full-bleed): Residencial / Comercial & Industrial / Rural
7. Cases (3, layout alternado): Residencial / Comercial-Industrial / Rural
8. FAQ (accordion)
9. CTA final + rodapé (símbolo do olho gigante de fundo, baixa opacidade)

---

## 6. COMPOSIÇÃO POR SEÇÃO

**Hero** — imagem full-bleed (ver referência anexa `referencia-lumina-01-hero.png`) com gradiente escuro na base (transparente → `#002350`) para contraste de texto. Nav pill no topo. Headline + subtexto + CTA duplo (pill amarela sólida + link texto) à esquerda. Badges de credibilidade abaixo do CTA (texto/número, não ícone genérico de escudo).

**Sobre** — split 55/45, imagem estática à esquerda, coluna de números à direita com count-up. Números em azul-marinho sobre off-white (nunca amarelo aqui — é informação, não ação).

**Processo** — seção pinned de 100vh (ver `referencia-lumina-02-processo.png`). Número gigante em outline à esquerda, texto do passo, imagem trocando à direita, indicador de progresso no rodapé da seção. Dot/passo ativo em amarelo.

**Serviços** — 3 blocos full-bleed sequenciais, foto ocupando 100% da largura, texto sobreposto no canto inferior esquerdo, ícone de linha técnica no canto superior.

**Cases** — layout alternado a cada case (ver `referencia-lumina-03-case.png`): imagem de um lado, nome do case em tipografia outline grande + números de resultado em amarelo do outro lado. Case 1 (Residencial, `vysao-case-residencial.jpg`) imagem à direita, Case 2 (Comercial & Industrial, `vysao-case-comercial-industrial.jpg`) imagem à esquerda, Case 3 (Rural, `vysao-case-rural.jpg`) imagem à direita.

**FAQ** — accordion simples, fundo off-white, ícone +/− azul-marinho.

**CTA final + rodapé** — fundo azul-marinho, frase de fechamento, CTA amarelo, símbolo do olho em opacidade baixa (~8-12%) atrás das colunas de contato, replicando o efeito do wordmark da referência.

---

## 7. ANIMAÇÕES E MICROINTERAÇÕES

- **Scroll geral:** fade-in + translação vertical de 16-24px por bloco ao entrar em viewport. Imagens com zoom sutil (scale 1.0→1.05) enquanto em tela.
- **Processo:** scroll-linked, seção presa até completar os 3 passos, indicador sincronizado sem delay perceptível.
- **Contadores:** count-up de 0 ao valor final, disparado só ao entrar em viewport, 1.5-2s, easing de desaceleração.
- **Nav:** transição suave da cápsula ativa (fade/slide, nunca troca instantânea). Fundo do nav ganha blur/sólido after X px de scroll.
- **Botões:** hover com leve escala (1.0→1.03) + sombra suave. Sem brilho ou gradiente animado.
- **Cases:** números de resultado fazem o mesmo count-up dos contadores da seção Sobre.
- **FAQ:** altura animada na abertura, ícone rotaciona 45°.
- **Acessibilidade de movimento:** todos os efeitos acima devem respeitar `prefers-reduced-motion` — usuários com essa preferência do sistema recebem fade simples sem scroll-jacking, sem count-up, sem zoom.

---

## 8. CONTEÚDO E COPY

**Hero**
> O sol paga a sua conta.
> Sistemas fotovoltaicos residenciais, comerciais e rurais — projetados e instalados pela pioneira em energia solar de Maringá.
CTA: `Simular economia` (primário) · `Falar com especialista` (secundário)
Badges: `+100 projetos realizados` · `Maringá e região` · `Projeto, instalação e pós-venda`

**Sobre**
> Muito além de painéis.
> Entregamos energia que se paga sozinha.
> Da análise de consumo à homologação, cuidamos de cada etapa para que sua economia comece no primeiro dia de operação.
Contadores: `+100 projetos` (real) · `[PLACEHOLDER] anos de mercado` · `[PLACEHOLDER] kWp instalados` · `[PLACEHOLDER] % de satisfação`

**Processo**
- 01 Projeto — "Analisamos seu perfil de consumo e dimensionamos o sistema exato para sua necessidade, sem desperdício."
- 02 Instalação — "Equipe própria cuida de toda a instalação e da homologação junto à concessionária."
- 03 Pós-venda — "Monitoramento contínuo e suporte para garantir performance ao longo dos anos."

**Serviços**
- Residencial — "Energia solar residencial" / "Reduza sua conta de luz com um sistema projetado para o seu consumo real."
- Comercial & Industrial — "Energia para o seu negócio" / "Sistemas de alta escala com retorno projetado e engenharia sob medida."
- Rural — "Energia para o seu agronegócio" / "Autossuficiência energética para propriedades, irrigação e produção."

**Cases** `[PLACEHOLDER nos números — substituir por projetos reais assim que o cliente aprovar dados; imagens já definitivas]`
- Residencial (`vysao-case-residencial.jpg`) — "Redução de X% na conta, payback em X anos."
- Comercial/Industrial (`vysao-case-comercial-industrial.jpg`) — "Sistema de XkWp instalado, redução de X% no custo operacional."
- Rural (`vysao-case-rural.jpg`) — "Autossuficiência energética para a propriedade, XkWp instalados."

**FAQ** (adaptar/expandir conforme o negócio real)
- Quanto posso economizar com energia solar?
- Preciso quebrar meu telhado para instalar?
- Se a concessionária ficar sem energia, eu continuo com luz?
- O sistema funciona em dias nublados ou chuvosos?
- Qual é a vida útil dos painéis solares?
- A Vysão cuida da homologação com a concessionária?
- Quais as condições de pagamento? *(resposta cita 48x Santander / 24x demais bancos — condição comercial variável, mantida só aqui, nunca hardcoded em outra seção)*

**CTA final**
> Você já pagou a conta de luz esse mês. Da próxima vez, deixe o sol pagar.
CTA: `Simular economia agora` · `Saiba mais`

**Rodapé** — colunas Sobre / Empresa / Contato (telefones e endereço reais) / Social (Instagram @vysaosolar).

---

## 9. DESKTOP E MOBILE

**Mobile — regra mais importante:** a seção de Processo **não deve ser pinned/scroll-jacked no mobile**. Scroll-jacking em telas de toque é um antipadrão de UX conhecido (interfere no gesto nativo de rolagem, aumenta taxa de abandono). No mobile, o Processo vira um carrossel horizontal ou cards empilhados verticalmente com o mesmo número/texto/imagem, sem prender o scroll.

- Nav pill vira menu hambúrguer ou barra inferior fixa com o CTA principal sempre visível.
- Hero: imagem recortada para foco central (o sistema fotovoltaico + entardecer), altura reduzida para não empurrar o CTA para fora da primeira dobra.
- Serviços e Cases: empilhados verticalmente, imagem sempre acima do texto (nunca lado a lado).
- Contadores: mesma animação, disparo ajustado para o viewport menor.
- Tamanhos de fonte reduzidos proporcionalmente (H1 hero cai para ~32-40px).

---

## 10. REQUISITOS TÉCNICOS (para o Claude Code)

**Stack sugerida** (ajustável pelo Claude Code conforme ambiente real do projeto): React + Tailwind CSS, Framer Motion para transições gerais, GSAP ScrollTrigger reservado especificamente para a seção pinned de Processo (é a única seção onde scroll-jacking é intencional).

- Imagens otimizadas em WebP, lazy-load abaixo da dobra inicial.
- Contraste mínimo AA (WCAG) em todo texto sobre imagem — gradiente overlay no hero já foi dimensionado para isso.
- Todo `<img>` com alt text descritivo.
- Accordion do FAQ navegável por teclado.
- Respeitar `prefers-reduced-motion` (ver seção 7).
- Componentes portáveis (evitar dependências exóticas), já que o fluxo de trabalho padrão do time é Lovable + Supabase — o código deve poder ser adaptado a esse ambiente depois, se necessário.

---

## 11. ELEMENTOS A EVITAR (regra explícita)

Template de energia solar genérico · site corporativo/SaaS/fintech · três cards de benefícios com ícone genérico · hero com painel "colado" ao lado do texto · excesso de bordas arredondadas / glassmorphism · gradientes decorativos sem função · seções desconectadas sem continuidade visual · footer corporativo padrão · uso do amarelo ou azul elétrico fora das funções definidas na Seção 2.

---

## 12. "NÃO PARECER UM SITE GERADO POR IA"

Regras concretas, não apenas intenção:

1. **Uma cor de ação, sempre.** Se em algum momento dois elementos de ação (dois CTAs, um CTA e uma tag) competem em amarelo e azul elétrico ao mesmo tempo, está errado — revisar a Seção 2.
2. **Sem efeitos decorativos sem função:** nada de partículas, cursor customizado, confete, texto "digitando" (typewriter), gradiente animado de fundo.
3. **Layouts assimétricos, nunca grid uniforme de cards.** A referência nunca repete "3 colunas iguais com ícone, título, texto" — cada seção tem uma composição própria.
4. **Tipografia grande faz o trabalho que ícone genérico faria.** Prefira número/palavra em destaque a um ícone de estoque.
5. **Copy nunca genérica.** Nada de "energia limpa para um futuro melhor" — toda frase deve ter um número, um lugar (Maringá) ou uma ação concreta.
6. **Fotografia real onde é prova; imagem tratada só onde é atmosfera** (Seção 4) — nunca o contrário.
7. **Espaço negativo é intencional.** Seções não devem estar "cheias" — a referência respira entre elementos.

---

## 13. CRITÉRIOS DE APROVAÇÃO

O site está pronto para revisão quando: (1) todas as seções da Arquitetura (Seção 5) existirem com a composição descrita; (2) nenhum `[PLACEHOLDER]` estiver publicável sem ter sido explicitamente aceito como definitivo; (3) a regra de cor (Seção 2) for verificável em cada tela; (4) a versão mobile não usar scroll-jacking (Seção 9); (5) `prefers-reduced-motion` estiver implementado.

---

## ANEXO — O que enviar ao Claude Code junto com este documento

1. Este arquivo (`VYSAO-SOLAR-DESIGN-DIRECTION.md`).
2. `vysao-logo-transparente.png` e `vysao-simbolo-olho-isolado.png` (logo tratada, fundo removido).
3. `vysao-hero-sem-marca-dagua.jpg` (imagem definitiva do hero).
4. `vysao-case-residencial.jpg`, `vysao-case-comercial-industrial.jpg`, `vysao-case-rural.jpg` (imagens definitivas dos 3 blocos de Serviços e dos 3 Cases — mesma imagem reaproveitada nas duas seções, já que representam o mesmo segmento).
5. (Opcional, apoio) `vysao-foto-real-comercial.png` e `vysao-foto-real-industrial-aerea.png` — fotos reais de baixa resolução, só se precisar reforçar autenticidade em algum ponto específico.
6. Os três prints de referência: `referencia-lumina-01-hero.png`, `referencia-lumina-02-processo.png`, `referencia-lumina-03-case.png`.

**Ainda em aberto, fora do escopo deste documento de design:** logos de fornecedores de equipamento (item 3 da Arquitetura), decisão sobre domínio/hospedagem, e se o CTA principal deve integrar com Supabase para captura de lead ou apenas redirecionar para WhatsApp/e-mail — resolver com o Claude Code no início da implementação.
