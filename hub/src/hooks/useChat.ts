import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  provider?: 'gemini' | 'openai' | 'system' | 'error' | string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou o **Jarvis**, o Copilot de BI da Brisa Laser. O que você gostaria de saber sobre nossa performance ou caixa hoje?',
      timestamp: new Date(),
      provider: 'system'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessageData = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 2. Call Edge Function /chat
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { query, history: messages }
      });

      if (error) {
        throw new Error(`Falha no Jarvis: ${error.message}`);
      }

      // 3. Add Assistant Message
      const assistantMsg: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Desculpe, não consegui formular uma resposta clara.',
        timestamp: new Date(),
        provider: data.provider
      };
      setMessages(prev => [...prev, assistantMsg]);

    } catch (err: any) {
      console.error(err);
      
      // Fallback para desenvolvimento local:
      const fallbackMsg: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '*[Aviso Local]: A Edge Function `/chat` ainda não foi feito deploy ou está sem a chave do Gemini configurada. Isso é apenas uma simulação.* O Custo por Lead de ontem foi R$ 10,40 no Google e R$ 13,20 no Meta Ads.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);

    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isTyping, sendMessage };
}
