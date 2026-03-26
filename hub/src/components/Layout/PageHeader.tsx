import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  badge = "PRO-MAX v1.2", 
  children 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'flex-start', 
      justifyContent: 'space-between', 
      paddingBottom: '16px',
      borderBottom: '1px solid var(--color-glass-border)',
      marginBottom: '16px',
      width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ 
            fontSize: '1.1rem', 
            margin: 0, 
            color: 'var(--text-main)', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}>
            {title}
          </h1>
          {badge && (
            <span style={{ 
              fontSize: '0.55rem', 
              padding: '2px 6px', 
              background: 'rgba(6, 182, 212, 0.1)', 
              color: 'var(--color-primary)', 
              borderRadius: '4px', 
              border: '1px solid rgba(6, 182, 212, 0.2)',
              fontWeight: 700,
              letterSpacing: '0.02em'
            }}>
              {badge}
            </span>
          )}
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: '0.7rem', 
          color: 'var(--text-muted)', 
          fontWeight: 400,
          opacity: 0.8
        }}>
          {subtitle}
        </p>
      </div>
      
      {children && (
        <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
          {children}
        </div>
      )}
    </div>
  );
};
