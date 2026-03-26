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
- **Donut/Pie**: Layout horizontal (Gráfico à esquerda / Legendas à direita).
- **Interatividade**: Efeito de "Glow" (drop-shadow) em fatias ativas; cursor pointer.
- **Break-even**: Barra de progresso linear com brilho LED e indicador de alvo (Target Marker).

### 3. Charts (Recharts Custom)
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
