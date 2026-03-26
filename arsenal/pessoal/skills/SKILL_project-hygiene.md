# Project Hygiene — Skill de Organizacao e Limpeza

> Skill para manter projetos limpos, organizados e sem lixo acumulado.
> Ativar periodicamente ou antes de releases importantes.

---

## Quando Usar

- Antes de um deploy importante
- Quando o projeto cresceu rapido e acumulou detritos
- Periodicamente (a cada 2 semanas ou 10+ commits)
- Quando algo "parece bagunçado" mas voce nao sabe exatamente o que

---

## Protocolo de Execucao

### Fase 1 — Scan (somente leitura, nunca altera nada)

Rodar os seguintes checks em paralelo e compilar um relatorio:

#### 1.1 Arquivos Mortos (Dead Files)
```bash
# Listar todos os .ts/.tsx que nao sao importados por ninguem
# Excluir: page.tsx, layout.tsx, route.ts, middleware.ts, *.config.*, *.d.ts
for f in $(find src/ -name "*.tsx" -o -name "*.ts" | grep -v node_modules | grep -v .next); do
  basename=$(basename "$f" | sed 's/\.\(ts\|tsx\)$//')
  # Pular arquivos do Next.js que sao entry points
  if [[ "$basename" == "page" || "$basename" == "layout" || "$basename" == "route" || "$basename" == "middleware" || "$basename" == "loading" || "$basename" == "error" || "$basename" == "not-found" || "$basename" =~ \.config$ || "$basename" =~ \.d$ ]]; then
    continue
  fi
  # Buscar imports desse arquivo em todo o projeto
  count=$(grep -rn "from.*['\"].*${basename}['\"]" src/ --include="*.ts" --include="*.tsx" | grep -v "$f" | wc -l)
  if [ "$count" -eq 0 ]; then
    echo "DEAD: $f"
  fi
done
```

#### 1.2 Arquivos Vazios ou Lixo
```bash
# Arquivos com 0 bytes
find src/ -empty -type f
# Arquivos "Icon" do macOS (criados pelo Finder)
find . -name "Icon?" -type f
# Arquivos .DS_Store
find . -name ".DS_Store" -type f
```

#### 1.3 Duplicatas
```bash
# Arquivos com mesmo nome em locais diferentes
find src/ -name "*.tsx" -o -name "*.ts" | xargs basename -a | sort | uniq -d
```

#### 1.4 Naming Consistency
Verificar se server actions seguem UMA convencao:
- `snake_case.ts` (generate_campaign.ts)
- `kebab-case.ts` (get-diagnostic-by-id.ts)
- `camelCase.ts` (getCampaign.ts)

Regra: escolher UMA e padronizar. Recomendacao: `snake_case` para server actions (alinha com Python backend).

#### 1.5 Arquivos Grandes (>300 linhas)
```bash
find src/ -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -rn | head -20
```
Candidatos a split: qualquer componente >400 linhas provavelmente tem responsabilidades demais.

#### 1.6 Imports Nao Usados
```bash
# Verificar com TypeScript compiler
npx tsc --noEmit 2>&1 | grep "is declared but"
```

#### 1.7 Console.logs Esquecidos
```bash
grep -rn "console\.log" src/ --include="*.ts" --include="*.tsx" | grep -v "// debug" | grep -v "logger"
```

#### 1.8 Dependencies Nao Usadas (package.json)
```bash
npx depcheck --ignores="@types/*,autoprefixer,postcss"
```

---

### Fase 2 — Relatorio

Compilar resultado no formato:

```markdown
## Project Hygiene Report — [projeto] — [data]

### Limpeza Imediata (safe to delete)
- [ ] Arquivo X (vazio / lixo macOS)
- [ ] Arquivo Y (duplicata exata de Z)

### Consolidacao (requer analise)
- [ ] ComponenteA e ComponenteB sao 90% iguais — consolidar?
- [ ] actions/ mistura snake_case e kebab-case — padronizar?

### Refatoracao (opcional, melhora manutencao)
- [ ] ArquivoGrande.tsx (450 linhas) — extrair sub-componentes
- [ ] 3 console.logs em producao — remover

### Metricas
| Metrica | Valor |
|---|---|
| Arquivos totais | X |
| Arquivos mortos | X |
| Duplicatas | X |
| Linhas totais | X |
| Maior arquivo | X (N linhas) |
```

---

### Fase 3 — Execucao (com confirmacao)

**Regras de ouro:**
1. NUNCA deletar sem confirmar com o usuario
2. Mostrar o que sera deletado ANTES de deletar
3. Fazer um commit separado: `chore: project hygiene — remove dead files and duplicates`
4. Manter um log do que foi removido no commit message

**Ordem de execucao:**
1. Deletar lixo obvio (arquivos vazios, Icon, .DS_Store)
2. Remover duplicatas exatas (manter a versao no local mais logico)
3. Padronizar naming (rename com git mv para preservar historico)
4. Consolidar componentes similares (se aprovado pelo usuario)
5. Split de arquivos grandes (se aprovado pelo usuario)

---

## .gitignore Preventivo

Adicionar ao `.gitignore` para prevenir lixo futuro:

```gitignore
# macOS
.DS_Store
**/Icon?

# IDE
.idea/
.vscode/settings.json

# Debug
*.log

# Python
__pycache__/
*.pyc
.venv/
*_env/
```

---

## Estrutura Visual de Pastas (Padrao Recomendado)

```
src/
├── app/                    # Rotas Next.js (somente page/layout/route)
│   ├── (os)/               # Rotas protegidas (behind auth)
│   │   ├── [modulo]/       # Um modulo por pasta
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── [subpage]/
│   │   └── ...
│   ├── (public)/           # Rotas publicas
│   ├── actions/            # Server actions GLOBAIS (snake_case)
│   └── layout.tsx
├── core/                   # Infraestrutura compartilhada
│   ├── components/         # Shell, Sidebar, SubSidebar (poucos)
│   ├── hooks/              # useAuth, useXrayStatus
│   ├── lib/                # supabase clients, utils
│   ├── types/              # Types globais
│   └── config/             # env.ts, constants.ts
├── features/               # Feature modules (isolados)
│   ├── [feature]/
│   │   ├── actions/        # Server actions DO FEATURE (snake_case)
│   │   ├── components/     # Componentes do feature
│   │   ├── hooks/          # Hooks do feature
│   │   ├── lib/            # Utils e types do feature
│   │   └── types.ts        # (ou lib/types.ts)
│   └── ...
├── components/             # Componentes compartilhados entre features
│   ├── ui/                 # Botoes, inputs, cards (atomicos)
│   └── [NomeComponente].tsx
└── middleware.ts
```

**Regras:**
- `app/` so tem page, layout, route, loading, error — ZERO logica
- `features/` sao isolados — feature A nao importa de feature B
- `core/` e `components/` sao compartilhados
- Server actions: `snake_case.ts` sempre
- Componentes: `PascalCase.tsx` sempre
- Hooks: `useCamelCase.ts` sempre

---

## Frequencia Recomendada

| Trigger | Acao |
|---|---|
| A cada 10 commits | Scan rapido (Fase 1.1 + 1.2) |
| Antes de release | Scan completo (todas as fases) |
| Apos feature grande | Scan focado no modulo novo |
| Quando "algo parece errado" | Scan completo |

---

## Integracao com CLAUDE.md

Adicionar ao CLAUDE.md do projeto:

```markdown
## Higiene do Projeto

Antes de releases ou a cada 10 commits, rodar scan de higiene:
- Skill: `/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/skills/SKILL_project-hygiene.md`
- Verificar: arquivos mortos, duplicatas, naming, arquivos grandes
- Nunca deletar sem confirmar com o usuario
```

---

**Criado em:** 2026-03-20
**Autor:** Caio Gaia + Claude
**Versao:** 1.0
