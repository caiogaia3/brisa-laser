# 🏆 Lean Agent Protocol (LAP) — SaaS Intelligence Blueprint
**Versão:** 1.0 (Senior Grade)
**Objetivo:** Máxima inteligência, zero desorganização e economia brutal de tokens.

---

## 🏗️ A Estrutura Gênese (Fase 0)

Ao iniciar um novo SaaS, a primeira tarefa da IA deve ser criar estes **4 Pilares de Ordem**:

1.  **`MAP.md` (Raiz):** O índice de GPS do projeto. Nunca deve passar de 40 linhas.
2.  **`docs/CLAUDE.md`:** As leis operacionais. Onde a IA aprende *como* trabalhar.
3.  **`docs/context.md`:** A memória RAM. Deve ser mantida curta (máx. 50 linhas) e comprimida.
4.  **`src/features/`:** O coração do negócio. Proibido pastas genéricas como `components/` ou `hooks/` na raiz de `src`.

---

## 🧠 O Ecossistema de Agentes

Para economizar tokens, não use um agente "Sabe-Tudo". Use **Micro-Especialistas**:

### 1. O Builder (Construção)
*   **Skill:** `.agent/skills/builder/SKILL.md`
*   **Domínio:** React, Next.js, Banco de Dados, Infra.
*   **Foco:** Transformar requisitos em código funcional e limpo.

### 2. O Strategist (Negócios)
*   **Skill:** `.agent/skills/strategist/SKILL.md`
*   **Domínio:** Marketing, Copy, UX, Estratégia, ICP.
*   **Foco:** Garantir que o código construído gere dinheiro/valor para o usuário.

---

## 🎮 Workflow de Operação Sênior (Dia-a-Dia)

Para extrair maestria da IA e economizar tokens, siga este ciclo:

### Passo 1: O Briefing de Alta Fidelidade
Nunca peça "faça X". Peça usando a fórmula: **[Domínio] + [Ação] + [Contexto] + [Output]**.
> *Exemplo: "[Traffic] + [Create Campaign] + [Client: Dental Clinic, Goal: Appointments] + [Output: JSON + MD Summary]"*

### Passo 2: O Despacho de Sub-Agente
Se o agente começar a ler muitos arquivos irrelevantes, corte-o:
> *"Use o sub-agente Builder. Foque apenas no arquivo X e Y. Ignore o resto."*

### Passo 3: O Snapshot de Contexto (A cada 5 sessões)
Manter o contexto limpo é o que mantém a IA inteligente. Quando sentir que as respostas estão ficando lentas ou imprecisas:
> *"Comprima o `context.md` agora. Resuma o que fizemos até aqui em 3 linhas e arquive o resto."*

---

## 🛡️ Leis de Manutenção Perpétua (Anti-Bagunça)

1.  **A Regra do Dono:** Cada Server Action ou Hook DEVE morar dentro da pasta da sua feature em `src/features/[feature]/`.
2.  **O Micro-Log:** Cada feature tem um `LEARNINGS.md`. A IA deve registrar lá erros de sintaxe ou "pegadinhas" específicas daquela feature. Isso evita que ela cometa o mesmo erro duas vezes.
3.  **O Build Gate:** Nunca considere uma tarefa pronta sem que o `npm run build` passe.

---

## 🚀 Como Aplicar em um Novo Projeto

Copie este workflow para o seu `.agent/workflows/genesis.md`:

```markdown
# Workflow: Project Genesis (Lean Agent Protocol)

1. Criar pastas: `docs/`, `archive/`, `src/features/`, `.agent/skills/`.
2. Criar `MAP.md` na raiz com o plano de pastas inicial.
3. Criar `docs/CLAUDE.md` com as regras de "Feature-Based Only".
4. Inicializar 2 sub-agentes: Builder e Strategist.
5. Criar a primeira feature (ex: `auth` ou `landing`) para testar os imports.
```

---
**Assinado:** Antigravity (Sênior AI Architect)
**Filosofia:** "O melhor código é o código que não precisa de explicação, e a melhor documentação é a que cabe em uma tela."
