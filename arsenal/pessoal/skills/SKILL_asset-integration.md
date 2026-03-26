# Skill: Auto-Integration de Novos Assets à Biblioteca

**Descrição:** Quando você cria uma skill, MCP ou workflow durante um projeto, Claude automaticamente:
1. Detecta o novo arquivo
2. Pergunta se quer integrar à biblioteca
3. Sugere casos de uso em outros projetos
4. Oferece adicionar ao CATALOG.md

**Quando usar:** Sempre que terminar uma skill/MCP/workflow novo

---

## 🎯 Trigger Automático

Claude deve oferecer integração quando:

```
- User cria um arquivo em ./skills/SKILL_*.md
- User cria um arquivo em ./mcps/mcp-*.py ou mcp-*.js
- User cria um arquivo em ./workflows/*.md
- User diz "criei uma skill nova" ou "novo MCP pronto"
```

---

## 🔄 Workflow de Integração

### Cenário 1: Você Cria Uma Skill

```
Você: "Pronto! Criei SKILL_auto-test.md que gera testes automaticamente"

Claude (automaticamente):

📦 **Nova Skill Detectada!**

**Arquivo:** ./skills/SKILL_auto-test.md
**Tipo:** Skill (gerador de testes)

---

🤔 **Quer integrar à sua biblioteca pessoal?**

Essa skill seria útil em:
✅ Projetos com TDD (rule-10)
✅ Projetos que precisam de cobertura 80%+
✅ Qualquer projeto que faz testes

**Benefício:** Reutilizar em ~5 próximos projetos
**Economia:** ~2 horas por projeto x 5 = 10 horas salvas

---

**Opções:**

A) **SIM, adicionar à biblioteca**
   - Claude copia para `/biblioteca/pessoal/skills/SKILL_auto-test.md`
   - Atualiza `/biblioteca/pessoal/CATALOG.md`
   - Cria entrada em memória do projeto
   - Resultado: Disponível em próximos projetos

B) **NÃO, deixa aqui no projeto**
   - Fica local, Claude não copia
   - Disponível para referência no futuro

C) **TALVEZ, me mostra antes**
   - Claude exibe o arquivo
   - Você aprova antes de integrar

**Qual você prefere?**
```

### Cenário 2: Você Diz "Criei MCP novo"

```
Você: "Finalizei um MCP que integra com Slack, preciso integrar isso?"

Claude (automaticamente):

📦 **Novo MCP Detectado!**

**Arquivo:** ./mcps/mcp-slack-integration.py
**Tipo:** MCP (integração com Slack)

---

🤔 **Análise de Reutilização:**

Essa integração seria útil em:
✅ Qualquer SaaS com notificações
✅ Automação de vendas (jarvis-orchestrator)
✅ Dashboards que precisam de Slack sync
✅ ~6-7 próximos projetos

**Estimativa de economia:** 15 horas de desenvolvimento reutilizável

---

**Quer integrar?** (Recomendo SIM)
A) Sim, adicionar à /biblioteca/pessoal/mcps/
B) Não, deixa local
C) Talvez, me mostra antes
```

---

## 🔍 Análise de Reutilização (O que Claude Faz)

Quando você escolhe integrar, Claude analisa:

### 1. Identificar Caso de Uso

```markdown
**Nome:** auto-test-skill
**Tipo:** Skill (gerador de testes)

**Caso de Uso:**
- Gera testes automaticamente baseado em função
- Implementa padrão TDD
- Cobre 80%+ do código
```

### 2. Listar Projetos Compatíveis

```markdown
**Reutilizável em:**
- Projetos com rule-10 (TDD obrigatório)
- Qualquer projeto SaaS
- Qualquer projeto backend/frontend
- ~15+ projetos futuros estimados
```

### 3. Calcular Economia

```markdown
**Economia:**
- Tempo por projeto: 2-3 horas
- Próximos 5 projetos: 10-15 horas
- Próximos 10 projetos: 20-30 horas
```

---

## 📝 Integração Automática (Se Você Disser SIM)

```bash
# Claude executa:

1. Copiar arquivo
cp ./skills/SKILL_auto-test.md /Users/CaioGaia/Documents/PROJETOS\ /biblioteca/pessoal/skills/

2. Atualizar CATALOG.md
# Adiciona entrada em /biblioteca/pessoal/CATALOG.md

3. Atualizar memória
# Salva em /memoria/novo-asset-auto-test.md

4. Confirmar
echo "✅ SKILL_auto-test.md integrada à biblioteca!"
echo "📍 Próximos projetos: usar /Users/CaioGaia/Documents/PROJETOS /biblioteca/pessoal/skills/SKILL_auto-test.md"
```

---

## 🎯 Quando Claude Oferece (Triggers)

Claude deve AUTOMATICAMENTE oferecer integração quando:

```markdown
1. User cria arquivo em ./skills/SKILL_*.md
2. User cria arquivo em ./mcps/
3. User cria arquivo em ./workflows/
4. User diz "criei X novo"
5. User diz "achei uma solução legal"
6. User pede "salva isso na biblioteca"
```

---

## ❌ Quando NÃO Oferecer

```markdown
❌ Muito específico do projeto (ex: SKILL_cliente-xyz-workflow.md)
❌ Código incompleto ou com bugs
❌ Cópia de algo que já existe na biblioteca
❌ User diz "não, deixa local"
```

---

## ✅ Checklist de Integração

```markdown
Antes de integrar, Claude verifica:
- [ ] Arquivo está completo e funcionando
- [ ] Nome é descritivo
- [ ] Docstring/descrição explicam caso de uso
- [ ] Reutilizável em >1 projeto
- [ ] User aprovou ("SIM")
- [ ] Não duplica com biblioteca existente
```

---

## 📚 Exemplo Completo

### Step 1: User Cria Skill

```python
# ./skills/SKILL_auto-validation.md
# Gera validação de input automaticamente com Pydantic
```

### Step 2: Claude Detecta

```
Claude: "📦 Nova Skill detectada!

SKILL_auto-validation.md — Gera validação com Pydantic

Reutilizável em:
- Todo projeto com FastAPI
- Qualquer API que valida input
- ~20+ próximos projetos

Integrar?"
```

### Step 3: User Escolhe

```
User: "SIM"
```

### Step 4: Claude Integra

```
Claude executa:
1. cp ./skills/SKILL_auto-validation.md → /biblioteca/pessoal/skills/
2. Atualiza CATALOG.md
3. Salva em memória
4. Confirma integração

✅ Pronto! Disponível em próximos projetos.
```

### Step 5: Próximo Projeto

```
User (novo projeto): "Preciso validar input"
Claude: "Tenho uma skill exatamente pra isso! SKILL_auto-validation"
User: "Copia aqui?"
Claude: "Já copiada!"
```

---

**Criado em:** 2026-03-20
**Status:** Ready to use — Claude deve ativar automaticamente
