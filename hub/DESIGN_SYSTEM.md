# Pro-Max Design System 💎 (Brisa Hub)
**Versão:** 1.2 (Pro-Max Deluxe)
**Base:** [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git)

## 🎨 Paleta de Cores (Tokens CSS)
- **Background Principal**: `#050508` (Dark Deep Black)
- **Primary (Ciano)**: `#06b6d4` (LED Cyan)
- **Accent (Verde)**: `#4ade80` (Emerald Progress)
- **Warning (Laranja)**: `#fb923c` (Sunset Alert)
- **Border Glass**: `rgba(255, 255, 255, 0.08)`

## 🧱 Componentes Core
### 1. Liquid Glass (`.liquid-glass`) [Novo Padrão]
- **Blur**: `backdrop-filter: blur(28px)` (ultra-smooth).
- **Background**: `rgba(255, 255, 255, 0.015)`.
- **Border**: `rgba(255, 255, 255, 0.06)`.
- **Shadow**: Inset glow + deep drop shadow.
- **Interatividade**: Hover com brilho ciano (`shadow-glow-cyan`).
- **Golden Status (Alert)**: 
    - Classe: `.status-alert`
    - Efeito: Borda `rgba(239, 68, 68, 0.5)` + Shadow Glow Vermelho pulsante.
    - Gatilho: Quando a métrica está abaixo da meta do Playbook.
- **Info Tooltip (`(i)`)**:
    - Classe: `.info-icon`
    - Style: Circular, `14px`, Muted border.
    - Active: `.info-tooltip` - Liquid Glass, blur 28px, Z-index alto, Título Gold, Texto Branco.

### 2. Glass Panel (`.glass-panel`) [Legacy/Secondary]
- **Blur**: `16px`.
- **Uso**: Somente em elementos secundários ou backgrounds simples.

### 3. KPICard (High-Density Liquid)
- **Container**: Obrigatório `.liquid-glass`.
- **Altura**: `110px`.
- **Vertical Rhythm**: Título e Valor agrupados no topo para máxima visibilidade; Pill Badge e Sparkline ancorados na base.
- **Tipografia**: Valor em `1.5rem / 800` (extra-bold), Título em `0.55rem / 700 / All-Caps`.
- **Padding**: `16px 18px 12px 18px`.

### 3. Inputs & Selects
- **Radius**: `14px` (`var(--radius-lg)`) - Padronizado com os cards de radar.
- **Background**: `var(--color-surface)` com borda sutil.

### 5. Charts (Premium Liquid Visuals)
- **Container**: Todo gráfico deve estar envolto em um `.liquid-glass`.
- **Zandu Donut (Progress)**: 
    - Layout: Centralizado para impacto (Donut largo).
    - Data: Valor principal no centro, Legend no rodapé ou lateral.
    - Efeito: Glow Neon na cor da série ativa.
- **King Charts (Cross-Metrics) [Ultra-Premium]**:
    - **A. ROAS Visual**: `Dual-Axis (Glow-Area + Neon-Line)`. A Área representa a Receita (Preenchimento degradê suave); a Linha representa o Investimento (Traço fino em Ciano Neon).
    - **B. Eficiência de Ativo**: `Stacked Bar + Scatter Dots`. Colunas agrupadas para horas de uso + Pontos flutuantes (Glow-Dots) para Receita/Hora.
    - **C. Matriz de Retenção (LTV)**: `Radar Chart (Pentagon)`. Representação de 5 eixos (Volume, Velocidade, CAC, LTV, Conversão). Fundo com *Atmospheric Blur*.
    - **D. Payback Timeline**: `Step Area Chart`. Visualização em "Degraus" cruzando a linha de zero (Break-even). Área negativa em vermelho fosco; área positiva em verde esmeralda vibrante.
- **Zandu Bar (Ranking/Mix)**: 
    - Orientação: Horizontal para legibilidade de textos longos (ex: nomes de áreas).
    - Style: Barras com cantos arredondados (`4px`) e gradientes sutis.
- **Tooltips**: Glassmorphism com borda ciano vibrante.
- **Lines**: Stroke de `2px` com `activeDot` estilo LED (shadow glow).

## 🏁 Page Headers (Deluxe Pattern)
- **Title**: `text-main`, uppercase, weight 800, `1rem`.
- **Subtitle**: `text-muted`, weight 400, `0.7rem`.
- **Layout**: Flex col com gap de `2px`.

## 📑 Tabs (Mini-Navigation)
- **Active**: 
    - Bg: `rgba(6, 182, 212, 0.08)`
    - Border: `1px solid var(--color-primary)`
    - Shadow: `0 0 15px rgba(6, 182, 212, 0.15)`
    - Color: `var(--color-primary)`
    - Weight: `700`
- **Inactive**:
    - Bg: `transparent`
    - Color: `var(--text-muted)`
    - Weight: `500`
- **General**: Radius `8px`, Font `0.7rem`, Spacing `px-12 py-6`.

## 📅 Period Selector (DatePicker)
- **Segmented Control**: Pill-style navigation (`H-36px`, blur 10px).
- **Custom Popover**: 
    - Layout: Side-by-side (`grid-cols-2`) for start/end dates.
    - Style: `.liquid-glass` com blur reforçado (`28px`), dark bg.
    - Inputs: Minimalist, `outline: none`, focus border cyan.
    - CTA: Gradient `(primary -> dark-cyan)`, shadow glow.
