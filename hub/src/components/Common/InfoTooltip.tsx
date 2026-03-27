import React, { useState, useRef } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  title: string;
  content: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + 20,
        left: Math.min(rect.left - 110, window.innerWidth - 280)
      });
      setIsVisible(true);
    }
  };

  return (
    <div 
      style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '6px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
      ref={iconRef}
    >
      <div className="info-icon" style={{ cursor: 'help' }}>
        <Info size={12} />
      </div>
      
      {isVisible && (
        <div 
          className="info-tooltip-content"
          style={{ 
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            opacity: 1,
            pointerEvents: 'none',
            zIndex: 9999,
            width: '260px',
            animation: 'fadeIn 0.3s ease-out',
            backdropFilter: 'blur(48px) saturate(220%)',
            background: 'rgba(5, 5, 10, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 50px rgba(0, 0, 0, 0.8)',
            transform: 'scale(1) translateY(0)'
          }}
        >
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.1em' }}>
            {title}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.4', fontWeight: 500 }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
