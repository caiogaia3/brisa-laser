# 📜 Protocolo de Elite Brisa Laser: Retrospectiva & Blindagem Técnica

Este documento registra as lições aprendidas durante o Troubleshooting do Fluxo **Zandu -> Google Sheets** (Março 2026), servindo como guia mestre para evitar a reincidência de erros.

---

## 🚀 1. O Webhook (A Porta de Entrada)
- **Erro**: Webhook não disparava ou era recebido como GET (vazio).
- **Causa**: Configuração de método no Zandu ou detecção automática falha no n8n.
- **Lição**: Sempre configurar manualmente como **POST** e validar se o payload chega via "Listen to Events".

## 📞 2. Enriquecimento de Dados (Zandu API)
- **Descoberta**: O Zandu **não envia o Telefone** no Webhook inicial, apenas o `personId`.
- **Protocolo**: Sempre inserir um nó HTTP Request logo após o Parse Master para buscar os detalhes do cliente (`GET /persons/ID`) usando o Bearer Token.

## 🔢 3. O Match do Telefone (A Lógica do Robô)
- **Problema**: Telefones vinham em formatos diferentes (com/sem +55, com/sem parênteses).
- **Solução Definitiva**: 
  1. Limpar tudo que não é número (Regex `\D`).
  2. Fazer o "Match" usando apenas os **8 últimos dígitos** (`slice(-8)`). Isso ignora mudanças de DDD ou o 9º dígito.

## 📊 4. Bugs Críticos do Google Sheets (n8n v4.5)
O nó v4.5 do Google Sheets possui bugs de interface conhecidos que combatemos assim:

### ⚠️ A Armadilha do "Manual Mapping"
- **Bug**: Se você trocar uma coluna no modo manual, o n8n às vezes mantém o valor antigo "fantasma" escondido no código, gerando erros de `null` ou `undefined`.
- **Blindagem**: **NUNCA** usar o modo "Map Each Column Manually" para fluxos complexos.
- **Solução de Ouro**: Usar um nó **Set (Edit Fields)** antes do Sheets para limpar e nomear as colunas, e no Sheets usar o modo **"Map Automatically"**.

### ⚠️ Pontos Finais em Cabeçalhos
- **Bug**: Colunas chamadas `Qtd. Áreas` (com ponto) fazem o n8n achar que é um objeto aninhado, criando colunas extras como `Qtd`.
- **Protocolo**: **Proibido usar pontos** em nomes de colunas na planilha. Use Underscore (Ex: `Qtd_Areas`).

### 📍 Localização de Dados (Header Row)
- **Lembrete**: As planilhas Brisa têm cabeçalhos na **Linha 2** e dados na **Linha 3**.
- **Configuração**: Sempre setar `Options -> Data Location -> Header Row: 2` e `First Data Row: 3`.

## ✍️ 5. Sintaxe de Expressões (O Erro do `=`)
- **Erro**: Colocar `={{ $json.Campo }}` dentro de uma caixa que já está no modo expressão.
- **Resultado**: O n8n envia a string literal `=Valor` e o Google Sheets tenta calcular uma fórmula inexistente.
- **Lição**: Comece a expressão direto na chave: `{{ $json.Campo }}`. O sinal de igual `=` é implícito pela interface.

## ⚙️ 6. Tipos de Dados (Booleanos)
- **Erro**: Comparar o pulso verde `true` (Booleano) com a palavra `"true"` (Texto).
- **Lição**: No nó IF, selecione sempre o tipo de comparação **Boolean** especificamente.

## 🛡️ 7. Infraestrutura & API
- **Problema**: O Firewall (EasyPanel) barrou o acesso via API para salvar o fluxo.
- **Plano B**: Sempre manter o JSON do fluxo em um arquivo local para colagem manual rápida caso a automação de deploy seja bloqueada.

---
**Atualizado por Jarvis (Antigravity) em 19/03/2026.**
