import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query, history } = await req.json();

    // 1. Setup do Supabase c/ Service Role Key (para query de dados sem sofrer bypass pro prompt)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 2. Extrai dados mais recentes para municiar o prompt do Gemini
    // Puxa o resumo do mês atual e o anterior
    const { data: dreData } = await supabase.from('vw_brisa_master_bi').select('*').order('period_month', { ascending: false }).limit(2);
    
    // 3. Monta o Prompt para a IA
    const systemPrompt = `Você é o Jarvis, o Copilot Executivo Analítico da Brisa Laser - Inteligência de Negócios.
Seu objetivo é extrair insights acionáveis sobre os dados apresentados de maneira assertiva e no estilo de um Diretor Financeiro/Marketing premium. Responda de forma clara, em português brasileiro.
Mantenha suas respostas concisas (máximo 2 parágrafos). Use Markdown para formatar tabelas ou negritos.

Dados mais recentes do Dashboard (Panorama Executivo):
Mês Atual: ${JSON.stringify(dreData?.[0] || 'Sem dados')}
Mês Anterior: ${JSON.stringify(dreData?.[1] || 'Sem dados')}

Você também tem acesso ao histórico desta sessão para manter contexto contínuo.
Abaixo está a pergunta atual do usuário:
"${query}"`;

    // 4. Integração Multi-Modelo (LLM Router: Gemini -> Fallback ChatGPT)
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

    let textReply = '';
    let providerUsed = 'gemini';

    try {
      if (!geminiApiKey) throw new Error("GEMINI_API_KEY ausente");

      // Tenta conexão primária com Gemini (Versão Clássica e Estável 'gemini-pro')
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 800 }
        })
      });

      const geminiData = await geminiResponse.json();
      
      if (geminiData.error) {
        throw new Error(`Google recusou: ${geminiData.error.message}`);
      }

      textReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textReply) throw new Error("Gemini retornou texto em branco");

    } catch (geminiError: any) {
      console.log("Falha no Gemini. Acionando Rota de Fallback para ChatGPT: ", geminiError.message);
      providerUsed = 'openai';

      // --- Rota de Fallback: ChatGPT ---
      if (!openaiApiKey) {
        return new Response(JSON.stringify({ 
          reply: `🤖 **Sistema de Roteamento de IA Ativado**\nO Google Gemini falhou (\`${geminiError.message}\`). O Jarvis tentou acionar o **ChatGPT** como plano B, mas a \`OPENAI_API_KEY\` não foi encontrada no painel da Supabase. Por favor, adicione sua chave lá para o roteador funcionar!`,
          provider: 'system'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: systemPrompt }],
            temperature: 0.1,
            max_tokens: 800
          })
        });

        const openaiData = await openaiResponse.json();

        if (openaiData.error) {
          throw new Error(`OpenAI recusou: ${openaiData.error.message}`);
        }

        textReply = openaiData.choices?.[0]?.message?.content || "ChatGPT respondeu em branco";

      } catch (openaiError: any) {
         // Se ABSOLUTAMENTE tudo falhar (Cata-trófico)
         return new Response(JSON.stringify({ 
           reply: `🔴 **Colapso nos Motores de IA**\nGemini: ${geminiError.message}\nChatGPT: ${openaiError.message}`,
           provider: 'error'
         }), {
           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         });
      }
    }

    return new Response(JSON.stringify({ reply: textReply, provider: providerUsed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
