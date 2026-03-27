import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  title: string;
  content: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '6px' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Info 
        size={14} 
        style={{ 
          cursor: 'help', 
          color: isVisible ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.3)',
          transition: 'color 0.2s'
        }} 
      />
      
      {isVisible && (
        <div className="liquid-glass" style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '10px',
          width: '240px',
          padding: '12px',
          background: 'rgba(5, 5, 8, 0.9)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
          zIndex: 100,
          pointerEvents: 'none',
          animation: 'fade-in-up 0.2s ease-out'
        }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.1em' }}>
            {title}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.4', fontWeight: 500 }}>
            {content}
          </div>
          
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '6px',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, 0.1) transparent transparent transparent'
          }} />
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InfoTooltip;
