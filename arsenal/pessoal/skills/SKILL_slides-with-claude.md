# Skill: Criar Apresentações com Claude

**Descrição:** Workflow estruturado em 3 etapas para criar apresentações powerpoint/figma com Claude, garantindo pesquisa rigorosa, estrutura lógica e design executivo.

**Quando usar:** Sempre que precisa criar slides (board decks, pitch decks, research presentations, training, etc)

**Resultado:** Apresentação pronta com estrutura completa, copy + dados

**Tempo:** 2-4 horas (dependendo da complexidade)

---

## Protocolo em 3 Etapas

### ETAPA 1: PESQUISA (30-60 min)

**Objetivo:** Coletar dados, tendências e referências visuais de forma rigorosa

**O que fazer:**
1. Defina o tópico/objetivo da apresentação
2. Indique **critérios de sucesso** (o que "pronto" significa)
3. Forneça referências visuais:
   - Screenshots de designs que você gosta
   - Links de figma/websites com estilo similar
   - Inspo de slides (Gamma, Canva, slides.com, 21st.dev)
   - Componentes do shadcn/ui que você quer usar

**Exemplo de prompt:**

```
Quero criar uma apresentação pptx sobre "Crescimento em 2026".

Critérios de sucesso:
- [ ] Estrutura: Intro → 3 partes principais → CTA
- [ ] Design: Dark mode, cores: #1a1a1a (bg) + #ff6b35 (accent) + branco
- [ ] Componentes: Cards com ícones, gráficos minimalistas
- [ ] Tom: Executivo mas não chato

Referências:
- Gosto do design deste site: [link]
- Estes componentes do shadcn/ui: button, card, progress
- Cores similares ao tema do Linear

Primeiro, pesquise as tendências de crescimento em 2026 e sugira:
- 5 buscas para eu fazer manualmente
- Estrutura de slides (número de slides, fluxo)
- Dados/métricas-chave que devem aparecer
- Design direction (2-3 referências visuais similares ao que pedi)
```

**O que o Claude faz:**
- WebSearch por tendências, dados, case studies
- Identifica lacunas na sua pesquisa (coisas que você não sabe)
- Sugere 5-10 buscas específicas pra você refinar
- Salva tudo em `research-brief.md`:

```markdown
# Research Brief — [Tópico]

## Tendências Identificadas
1. [Tendência] - Fonte, impacto, timeframe
2. [Tendência]

## Dados & Métricas
- Métrica X: valor + benchmark + relevância
- Métrica Y: ...

## Referências Visuais
- [Figma link] - por quê serve como inspo
- [Website] - elementos que vamos copiar

## Lacunas
- O que falta pesquisar mais
- O que foi controverso
- O que é conflitante

## Estrutura Recomendada
- Slide 1: Intro (problema/oportunidade)
- Slide 2: Contexto (mercado, tendências)
- Slides 3-5: Argumento principal (dados + visuals)
- Slide 6: CTA (próximo passo)

## Design Direction
Cores: [palette]
Tipografia: [sans-serif]
Componentes: [button, cards, progress bar]
Refs: [3 slides similares no estilo]
```

---

### ETAPA 2: ESTRUTURA (45-90 min)

**Objetivo:** Transformar pesquisa em esboço de slides (skeleton)

**O que fazer:**
1. Entregue ao Claude o `research-brief.md`
2. Peça estrutura de slides com:
   - Título + subtitle (max 8 palavras cada)
   - 3 bullet points (max 1 frase cada)
   - Dados/estatísticas específicas
   - Espaço pra visual (descrição do tipo de gráfico/imagem)

**O que o Claude gera:**

```markdown
# Slide Outline — [Tema]

## Slide 1: Hero/Intro
- H1: "Crescimento em 2026: 3 tendências que importam"
- H2: "Dados de janeiro-março 2026 + direções para Q2-Q4"
- Elementos visuais: fundo escuro + ícone grande (crescimento/seta)
- CTA visual: "Swipe pra saber mais"

## Slide 2: Context
- H1: "Mercado em Transição"
- 3 key points:
  - Ponto 1: [estatística] - por que importa
  - Ponto 2: [estatística]
  - Ponto 3: [estatística]
- Gráfico: Linha do tempo 2023 → 2026 mostrando shift
- Fonte: [URL]

## Slide 3: Opportunity
- H1: "Onde a Oportunidade Está"
- Elemento: Tabela comparativa (Antes vs Depois)
- Data: [estruturada]

...
```

**Restrição importante:** NÃO escreva parágrafos completos. Apenas:
- Estrutura (H1, H2, bullets)
- Dados específicos (números, fontes)
- Tipo de visual (não a imagem em si)

Isso permite que o Claude trabalhe com a estrutura sem ficar verboso, e deixa espaço pra criatividade do design.

Salve em `gamma-outline.md` (ou no formato que você usar).

---

### ETAPA 3: GERAÇÃO (60-120 min)

**Objetivo:** Transformar outline em apresentação real

**Opção A: Gamma.app (Recomendado para CLaude)**

1. Entregue `gamma-outline.md` ao Claude
2. Peça pra criar prompt para Gamma:

```
Vou copiar esse outline para Gamma.app (presentation generator).
Gere um prompt descritivo que eu passo pro Gamma:

[Seu prompt para Gamma com tons, style, data, estrutura]
```

3. Claude gera algo como:

```
Title: "Growth in 2026: 3 Trends That Matter"
Theme: Dark mode, accent color #ff6b35, sans-serif
Tone: Executive, data-driven, forward-thinking
Structure:
- Slide 1: Hero with icon
- Slides 2-4: Data + visuals
- Slide 5: CTA

Copy guidelines:
- H1: max 8 words
- H2: max 20 words
- Bullets: max 1 line each
- Numbers highlighted: #ff6b35
```

Cole em Gamma → pronto!

**Opção B: Figma + Claude Design**

1. Crie um frame no Figma com o design system
2. Claude gera componentes / layout em Figma tokens

**Opção C: PowerPoint + Slide Automation**

1. Gere markdown → convertido pro template PPTX

---

## Checklist Pós-Apresentação

**Antes de apresentar:**

- [ ] H1s fazem sentido em ordem (fluxo narrativo)
- [ ] Cada slide tem NO MÁXIMO 1 visual + dados
- [ ] Números são check-doubles (fonte verificada)
- [ ] Design é consistente (cores, tipografia, espaçamento)
- [ ] CTA final é claro (o que fazer next)
- [ ] Nenhum slide é "filler" (cada um move a narrativa)

**Após feedback:**

- [ ] Adicione versão "speaker notes" com deeper context
- [ ] Crie "backup slides" com dados complementares
- [ ] Teste em 1280x720 (padrão de apresentação)

---

## Exemplo Real

**Input:**
```
Quero criar um deck de 8 slides sobre "Automação de Vendas 2026".
Público: CXOs de empresas B2B (50-500 pessoas).
Estilo: Dark mode, cores do Linear (preto/azul/branco).
Dados: Use tendências de 2026 + benchmarks de sales automation.
```

**Etapa 1 — Claude pesquisa:**
- Tendências de sales automation 2026
- Benchmarks de ROI (Gartner, Forrester, G2)
- Casos de uso (3-5 principais)
- Salva em `research-brief.md`

**Etapa 2 — Claude estrutura:**
- Outline de 8 slides
- Dados específicos por slide
- Tipos de visuais
- Salva em `gamma-outline.md`

**Etapa 3 — Claude gera:**
- Prompt otimizado pra Gamma/Figma/PowerPoint
- Alternativas de copy (racional vs emocional vs provocativo)
- Dados de backup pra speaker notes

**Output Final:** Apresentação pronta em 3-4 horas (vs 2 dias manual)

---

## Pro Tips

1. **Pesquisa é 50% do trabalho.** Não pule. Dados ruins = deck ruim.
2. **1 visual por slide.** Não misture gráfico + foto + ícone.
3. **Copy minimal.** Se você escreve mais de 3 bullets, você está teorizando. Dados falam sozinhos.
4. **Referências visuais importam.** Coloque 3-5 designs que você gosta. Claude vai entender o estilo.
5. **Save intermediate files.** research-brief.md → gamma-outline.md → final deck. Fácil iterar.

---

**Criado em:** 2026-03-20
**Baseado em:** Prompt de Yago Martins
**Versão:** 1.0
