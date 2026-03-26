# Context.md — Automação e Ativação

Como usar `context.md` de forma automática e configurar auto-save do contexto.

---

## 📋 O que é Context.md?

`context.md` é um **checkpoint de sessão** que captura:
- Estado atual do projeto
- Decisões tomadas
- Erros resolvidos
- Arquivos importantes
- Próximos passos

**Benefício:** Qualquer Claude que ler este arquivo tem contexto completo do projeto, mesmo em nova sessão.

---

## 🔄 Como Ativar Automaticamente

### Opção 1: Adicionar ao CLAUDE.md (RECOMENDADO)

Edite o `CLAUDE.md` do seu projeto e adicione no início:

```markdown
## 📖 Contexto da Sessão

Antes de responder qualquer pergunta, leia:
- `/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/context.md` (estado atual)

Se eu digo "salvar checkpoint" ou "atualizar context.md", você deve:
1. Atualizar o arquivo com o novo estado
2. Adicionar em "Erros Já Resolvidos" se descobrir algo novo
3. Adicionar em "Decisões Tomadas" se tomar decision importante
4. Commit no git (se aplicável)

```

### Opção 2: Usar como Hook Pré-Commit

Criar um git hook que valida context.md antes de cada commit:

```bash
# .git/hooks/pre-commit

#!/bin/bash

# Verificar se context.md foi atualizado
CONTEXT_FILE="/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/context.md"
LAST_COMMIT=$(git log -1 --format=%H -- $CONTEXT_FILE)
CURRENT_CHANGES=$(git diff --name-only HEAD)

if echo "$CURRENT_CHANGES" | grep -q "context.md"; then
    echo "✅ context.md será atualizado neste commit"
    exit 0
else
    echo "⚠️  context.md não foi atualizado"
    echo "   Considere atualizar se houver mudanças importantes"
    # Permite commit mesmo assim (não é obrigatório)
    exit 0
fi
```

---

## 💾 Como Salvar Contexto Automaticamente

### Opção 1: Script Manual (Simples)

Quando você quer salvar o contexto da sessão atual:

```bash
#!/bin/bash
# arquivo: save-context.sh

CONTEXT_FILE="/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/context.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

# Atualizar timestamp
sed -i '' "s/^Última atualização:.*/Última atualização: $TIMESTAMP/" "$CONTEXT_FILE"

# Commit
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal"
git add context.md
git commit -m "chore: atualização automática de context.md"
git push origin main

echo "✅ Context.md atualizado e sincronizado"
```

**Usar:**
```bash
bash save-context.sh
```

### Opção 2: Automático com Cron (Advanced)

Executar `save-context.sh` automaticamente:

```bash
crontab -e

# Adicionar (toda quinta-feira às 18h):
0 18 * * 4 bash /Users/CaioGaia/Documents/PROJETOS /arsenal/save-context.sh
```

---

## 🎯 Protocolo Recomendado

### No Início de Cada Sessão
```markdown
Claude, você vai trabalhar comigo no projeto de [X].

Leia primeiro: `/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/context.md`

Depois me diga:
- Qual é o estado atual do projeto?
- Qual foi a última etapa concluída?
- Quais são os próximos passos?
```

### Ao Completar Tarefas Importantes
```markdown
Claude, acabei de [fazer X].

Atualize o context.md com:
- Adicionar em "Última Etapa Concluída": [o que foi feito]
- Se descobriu algo novo, adicione em "Erros Já Resolvidos"
- Atualizar "Próximos Passos" se mudou
```

### Ao Encontrar Problemas
```markdown
Encontrei este erro: [descrição]

Por favor:
1. Resolva o erro
2. Adicione em "Erros Já Resolvidos" do context.md
3. Explique por que isso funcionou

(Para não repetir no futuro)
```

---

## 📝 Estrutura do Context.md

```markdown
# Context — [Nome do Projeto]

## 🎯 Objetivo do Projeto
[O que você está construindo]

## 📊 Estado Atual
### ✅ Tarefa Concluída
[O que foi feito]

### ✅ Última Etapa Concluída
[Última coisa que funcionou]

### ⏭️ Próximos Passos
[O que vem depois]

## 💡 Decisões Tomadas
[Decisões e motivos]

## 📋 Arquivos Importantes
[Arquivos relevantes]

## 🔧 Restrições e Preferências
[Regras a seguir]

## 🐛 Erros Já Resolvidos
[Problemas passados e soluções]

---

**Última atualização:** YYYY-MM-DD HH:MM
**Status:** [✅ Em progresso / ✅ Completo / ⏳ Aguardando]
```

---

## ✅ Checklist para Ativar

- [ ] Adicionar seção de Context.md no seu CLAUDE.md
- [ ] Copiar `context.md.template` para novos projetos
- [ ] Atualizar context.md ao completar marcos importantes
- [ ] (Opcional) Configurar git hook pré-commit
- [ ] (Opcional) Configurar cron job para auto-save

---

## 🚀 Próximas Sessões

Quando você voltar em uma nova sessão:

```markdown
Claude, leia `/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/context.md`
e me confirme o estado atual do projeto.
```

Claude vai:
1. Ler o arquivo
2. Confirmar o estado
3. Entender decisões passadas
4. Saber próximos passos
5. Continuando de onde parou

---

**Criado em:** 2026-03-20
**Versão:** 1.0
