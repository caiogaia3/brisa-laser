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
### 1. Glass Panel (`.glass-panel`)
- **Blur**: `backdrop-filter: blur(16px)`
- **Radius**: `14px` (`var(--radius-lg)`)
- **Shadow**: `shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]`

### 2. KPICard (High-Density Pro-Max)
- **Altura**: `110px`.
- **Vertical Rhythm**: Título e Valor agrupados no topo para máxima visibilidade; Pill Badge e Sparkline ancorados na base.
- **Tipografia**: Valor em `1.5rem / 800` (extra-bold), Título em `0.55rem / 700 / All-Caps`.
- **Padding**: `16px 18px 12px 18px`.

### 3. Inputs & Selects
- **Radius**: `14px` (`var(--radius-lg)`) - Padronizado com os cards de radar.
- **Background**: `var(--color-surface)` com borda sutil.

### 4. Charts (Premium Visuals)
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
    - Style: Glass-panel (`blur-24px`), dark bg (`0.95 opacity`).
    - Inputs: Minimalist, `outline: none`, focus border cyan.
    - CTA: Gradient `(primary -> dark-cyan)`, shadow glow.
