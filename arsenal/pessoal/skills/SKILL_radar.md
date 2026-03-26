# SKILL: RADAR — Sistema Adaptativo de Inteligência Operacional

> Scout persistente que observa, aprende e evolui. Integra com context.md, erros-e-solucoes.md e CLAUDE.md
> num pipeline de maturação: observação → padrão → regra permanente.

**Quando usar:** Qualquer projeto ativo de médio/longo prazo.
**Ativar com:** Criar `RADAR.md` na raiz do projeto seguindo o template abaixo.

---

## Conceito

RADAR é um sistema vivo de inteligência operacional. Diferente de um to-do list:
- **Não é tarefa ativa** — são observações de canto de olho
- **Princípio da Carona** — só resolve se estiver no mesmo caminho da tarefa atual
- **Cresce e encolhe** — itens resolvidos são DELETADOS, não riscados
- **Aprende e evolui** — itens graduam para padrões, padrões graduam para regras

---

## Pipeline de Maturação (o sistema aprende)

```
Observação (durante trabalho)
    ↓  anota em 1 linha
RADAR.md (item com prefixo + data)
    ↓  recorrente 3+ vezes?
erros-e-solucoes.md (gradua como padrão de prevenção)
    ↓  fix aplicado 3+ vezes?
CLAUDE.md (vira Regra Operacional permanente)
```

Cada nível é mais permanente e mais automático. O sistema nunca esquece — ele promove.

---

## Prefixos de Urgência

| Prefixo | Significado | Ação |
|---|---|---|
| `!` | Bloqueia deploy | Resolver ANTES de push |
| `?` | Investigar | Verificar quando entrar na zona |
| (nenhum) | Oportunístico | Só resolver de carona |

Formato: `- prefixo descrição curta (DD/MM)`

---

## Protocolo de Operação

### Ao ENTRAR numa zona:
1. Ler itens da zona no RADAR
2. No caminho da tarefa? → resolve de carona (custo: ~0 tokens)
3. Fora do caminho? → ignora

### Durante TRABALHO:
- Notou algo? → Anota no RADAR: `- prefixo descrição (DD/MM)`
- NÃO para o trabalho atual

### Ao SAIR da zona:
1. Resolveu item → deleta a linha (não marca [x])
2. Padrão recorrente (3+ vezes)? → Gradua para `erros-e-solucoes.md`
3. Atualizar emoji da zona

### Auto-higiene (a cada sessão):
- Item com **14+ dias** sem ação → revisar relevância ou deletar
- Zona 🟢 por **3+ sessões** → colapsar para ⚪
- Regra no CLAUDE.md **5+ sessões sem uso** → questionar se ainda é relevante

---

## Formato do Arquivo RADAR.md (Template)

```markdown
# 🛰️ RADAR

> **Prefixos:** `!` = bloqueia deploy | `?` = investigar | sem prefixo = oportunístico
> **Auto-higiene:** item com 14+ dias sem ação → revisar ou deletar
> **Graduação:** item recorrente (3+ vezes) → move para erros-e-solucoes.md

ZONA1 🔴
- ! item crítico (DD/MM)
- ? item para investigar (DD/MM)

ZONA2 🟡
- item oportunístico (DD/MM)

ZONA3 🟢
- (ZONA LIMPA)

📊 Pulso: X abertos (Y! / Z? / W oportunísticos) | N graduados | 0 🔴 | varredura: DD/MM
```

**Regras de formato:**
- Sem headers markdown (##) — usar nome da zona em CAPS direto
- Sem checkboxes — resolveu = deleta a linha
- Data compacta: (DD/MM) no final da linha
- Zona limpa = nome + emoji + `(ZONA LIMPA)`

---

## Saúde de Zona

| Emoji | Significado | Critério |
|---|---|---|
| 🔴 | Crítico | 4+ itens OU qualquer item `!` |
| 🟡 | Atenção | 1-3 itens |
| 🟢 | Limpo | 0 itens ativos |
| ⚪ | Inativa | Zona limpa por 3+ sessões |

---

## Ecossistema Completo (4 arquivos)

```
CLAUDE.md (lean ~1.5k tokens)
  ├── Regras Operacionais (permanentes — promovidas de erros-e-solucoes)
  ├── Protocolo RADAR (resumido)
  └── Sistema Adaptativo (meta-regras de promoção)

context.md (auto-podado, max 2 sessões)
  ├── Estado Atual + Zona Ativa
  ├── Backlog Ativo
  └── Velocity Tracking (features/bugs/zonas por sessão)

RADAR.md (observações vivas)
  ├── Itens por zona com prefixos (!/?/vazio)
  └── Pulso (contadores)

erros-e-solucoes.md (leitura condicional — só em debugging)
  ├── Padrões de erro com Sintoma→Causa→Fix→Prevenção
  └── Padrões Graduados do RADAR (tabela de promoções)

docs/architecture.md (leitura condicional — só quando relevante)
  └── Referências pesadas (arquitetura, deploy, segurança, arsenal)
```

### Economia de tokens

| Arquivo | Leitura | Tokens |
|---|---|---|
| CLAUDE.md | Sempre (lean) | ~1.5k |
| context.md | Sempre (podado) | ~800 |
| RADAR.md | Só zona ativa | ~200 |
| erros-e-solucoes.md | Condicional | 0 ou ~500 |
| architecture.md | Condicional | 0 ou ~800 |
| **Total típico** | | **~2.5k** (vs ~6k antes) |

---

## Inicialização em Projeto Novo

1. Escanear estrutura de pastas (`src/`, `backend/`, etc.)
2. Agrupar por funcionalidade → cada grupo = 1 zona em CAPS
3. Adicionar zonas de infra (AUTH, DEPLOY, etc.)
4. Todas começam ⚪ (inativas)
5. Se projeto já teve `/scout`, usar relatório como base

---

## Graduação de Itens

Quando um item aparece 3+ vezes em sessões diferentes:

1. Extrair a regra genérica
2. Adicionar na seção "Padrões Graduados" do `erros-e-solucoes.md`
3. Deletar do RADAR
4. Incrementar contador de "graduados" no Pulso

Quando um fix em `erros-e-solucoes.md` é aplicado 3+ vezes:

1. Promover para CLAUDE.md como Regra Operacional
2. Marcar na tabela de graduados com data de promoção

---

## Sync Bidirecional com Arsenal

Ao modificar o **protocolo** do RADAR (não os dados), avaliar promoção ao arsenal:

| Critério | Pergunta |
|---|---|
| Estrutural? | Muda formato, regra ou protocolo? |
| Genérico? | Funciona em outro projeto? |
| Eficiente? | Economiza tokens ou reduz atrito? |

**3 SIM → Atualizar SKILL_radar.md no arsenal automaticamente.**

---

**Criado em:** 2026-03-20
**Autor:** Caio Gaia + Claude
**Versão:** 2.0 — Sistema Adaptativo (prefixos, auto-higiene, pipeline de maturação, velocity)
