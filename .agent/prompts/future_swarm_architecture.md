# Visão de Futuro: Arquitetura Swarm (Brisa Laser)

Este documento guarda a definição estratégica para a **Fase 3** do desenvolvimento da Inteligência Artificial da Brisa Laser. O Cérebro Central (Antigravity/Jarvis) deve consultar este arquivo quando o usuário sinalizar que a Isa está sobrecarregada, passiva em vendas, ou quando chegar a hora de especializar o atendimento.

## O Problema do Monolito (Lost in the Middle)
Se a Isa atuar como Recepcionista, Closer e Esteticista ao mesmo tempo, seu prompt base se torna muito longo. Isso causa o esquecimento das regras iniciais e conflito de interesse na resposta (ex: dar conselho médico com técnica de escassez de vendas).

## A Solução: Supervisor Pattern (Swarm)
A Isa será promovida a **Orquestradora Principal**. Ela não resolverá o problema a fundo, mas roteará a conversa para sub-agentes com prompts e ferramentas ultra-específicos.

### 1. O Orquestrador (Isa Principal)
* **Função:** Receber a mensagem do WhatsApp, ler o histórico recente, consultar o Supabase (`isa_lessons`) e classificar a intenção do cliente.
* **Ferramentas:** `transfer_to_closer`, `transfer_to_esthetician`, `transfer_to_post_sales`.

### 2. Agente Closer (O Vendedor Agressivo/Empático)
* **Função:** Assumir conversas onde o cliente demonstra interesse de compra, mas esbarra em objeções de preço ou tempo.
* **Técnica:** Metodologia SPIN Selling, criação de urgência, ancoragem de valor.
* **Ferramentas Exclusivas:** `give_discount` (consulta a tabela de margem permitida), `create_zandu_appointment`.

### 3. Agente Esteticista (A Especialista Técnica)
* **Função:** Responder dúvidas clínicas sobre métodos de depilação, fototipos de pele, foliculite, nível de dor e cuidados pré/pós laser.
* **Técnica:** Acolhedora, usar vocabulário clínico simples, transmitir enorme segurança médica. Não fala de preços.
* **Ferramentas Exclusivas:** `query_medical_rag` (Busca na base de PDFs e manuais da clínica).

### 4. Agente Pós-Venda e Retenção
* **Função:** Lidar com feedbacks e reclamações.
* **Técnica:** Escuta ativa, geração de pesquisa de NPS, apaziguar ânimos (ex: cliente relata queimadura na pele).
* **Ferramentas Exclusivas:** `register_complaint` (Notificar gerência imediatamente), `trigger_refund_review`.

---
*Nota ao Agente: Quando solicitado a implementar essa fase, divida os fluxos no n8n utilizando a funcionalidade de AI Agent Node trabalhando como "Tools" para o AI Agent principal (Isa).*
