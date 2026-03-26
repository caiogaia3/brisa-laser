# Pro-Max Design System 💎 (Brisa Hub)
**Versão:** 1.0 (CFO Grade)
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

### 2. KPICard (High-Density)
- **Altura**: `110px`
- **Layout**: 2 níveis (Título/Valor + Badge/Sparkline Row).
- **Tipografia**: Valor em `1.5rem / 700`, Título em `0.6rem / 600 / All-Caps`.

### 3. Inputs & Selects
- **Radius**: `14px` (`var(--radius-lg)`) - Padronizado com os cards de radar.
- **Background**: `var(--color-surface)` com borda sutil.

### 3. Charts (Recharts Custom)
- **Tooltips**: Glassmorphism com borda ciano vibrante.
- **Lines**: Stroke de `2px` com `activeDot` estilo LED (shadow glow).

## 📐 Regras de Layout
- **Gaps**: Grid fixo de `16px` para seções principais, `8px` para KPIs.
- **Overflow**: Todos os painéis possuem `overflow: hidden` para evitar quebras visuais em grids densos.
