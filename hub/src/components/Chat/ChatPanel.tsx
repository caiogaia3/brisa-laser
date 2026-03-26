import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatPanel = ({ isOpen, onClose }: ChatPanelProps) => {
  const { messages, isTyping, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  };

  // Funções simples para renderizar markdown básico (negrito)
  // Em prod usaríamos react-markdown
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-main)' }}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="liquid-glass" style={{
      position: 'fixed', bottom: '24px', right: '32px',
      width: '400px', height: '600px',
      display: 'flex', flexDirection: 'column',
      zIndex: 50, overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(59, 130, 246, 0.2)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid var(--color-glass-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(90deg, var(--color-surface), rgba(59, 130, 246, 0.1))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            backgroundColor: 'var(--color-primary)', width: '32px', height: '32px', 
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Bot size={18} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Jarvis Copilot <Sparkles size={12} color="var(--color-accent)" />
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Brisa Intelligence Hub</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} style={{ display: 'flex', gap: '12px', alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              {!isUser && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={14} color="var(--color-primary)" />
                </div>
              )}
              
              <div style={{
                padding: '12px 16px', borderRadius: '12px', fontSize: '0.875rem', lineHeight: '1.5',
                backgroundColor: isUser ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                color: 'var(--text-main)',
                borderBottomRightRadius: isUser ? '4px' : '12px',
                borderBottomLeftRadius: isUser ? '12px' : '4px',
                display: 'flex', flexDirection: 'column', gap: '8px'
              }}>
                <div>{renderMessageContent(msg.content)}</div>
                
                {/* Visual Badge para identificar qual IA gerou a reposta */}
                {!isUser && msg.provider && msg.provider !== 'system' && msg.provider !== 'error' && (
                  <div style={{ 
                    alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px', 
                    padding: '3px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 600,
                    background: msg.provider === 'openai' ? 'rgba(16, 163, 127, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                    color: msg.provider === 'openai' ? '#10a37f' : 'var(--color-primary)',
                    border: `1px solid ${msg.provider === 'openai' ? 'rgba(16, 163, 127, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                  }}>
                    {msg.provider === 'openai' ? <Bot size={10} /> : <Sparkles size={10} />}
                    {msg.provider === 'openai' ? 'Gerado com OpenAI GPT' : 'Gerado com Google Gemini'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start', maxWidth: '85%' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={14} color="var(--color-primary)" />
            </div>
            <div style={{
              padding: '12px 16px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', gap: '4px'
            }}>
              <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
              <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }}></div>
              <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--color-glass-border)' }}>
        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Qual a meta para hoje?"
            disabled={isTyping}
            style={{
              width: '100%', padding: '12px 48px 12px 16px', borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-glass-border)',
              color: 'var(--text-main)', outline: 'none', fontSize: '0.875rem'
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            style={{
              position: 'absolute', right: '6px', top: '6px',
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: input.trim() && !isTyping ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() && !isTyping ? 'pointer' : 'default', transition: 'all 0.2s'
            }}
          >
            <Send size={14} color={input.trim() && !isTyping ? 'white' : 'var(--text-muted)'} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes blink { 0% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }
        .typing-dot { animation: blink 1.4s infinite both; }
        .typing-dot:nth-child(1) { animation-delay: 0.2s; }
        .typing-dot:nth-child(2) { animation-delay: 0.4s; }
        .typing-dot:nth-child(3) { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};
