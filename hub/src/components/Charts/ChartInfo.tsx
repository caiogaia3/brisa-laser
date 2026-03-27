import React, { useState, useRef } from 'react';

interface ChartInfoProps {
  title: string;
  description: string;
}

export const ChartInfo: React.FC<ChartInfoProps> = ({ title, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + 20,
        left: Math.min(rect.left + window.scrollX - 100, window.innerWidth - 260)
      });
      setIsVisible(true);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div 
        ref={iconRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        className="info-icon"
        style={{ 
          width: '14px', 
          height: '14px', 
          fontSize: '9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        i
      </div>
      
      {isVisible && (
        <div 
          className="info-tooltip-content"
          style={{ 
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            opacity: 1,
            translate: '0',
            pointerEvents: 'none',
            zIndex: 9999,
            width: '240px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
            {title}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.4', fontWeight: 500 }}>
            {description}
          </div>
        </div>
      )}
    </div>
  );
};
