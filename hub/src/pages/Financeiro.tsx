import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BarChart2, FileText } from 'lucide-react';

export const Financeiro = () => {
  const location = useLocation();
  const isResumo = location.pathname === '/financeiro';

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingBottom: '8px',
        borderBottom: '1px solid var(--color-glass-border)',
        marginBottom: '8px'
       }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '1rem', margin: 0, color: 'var(--text-main)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Financeiro <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ Radar</span>
          </h1>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <NavLink to="/financeiro" end style={{
             padding: '6px 12px', borderRadius: '6px',
             backgroundColor: isResumo ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
             color: isResumo ? 'var(--color-primary)' : 'var(--text-muted)',
             textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
             fontWeight: isResumo ? 600 : 500, transition: 'all 0.2s',
             fontSize: '0.875rem'
          }}><BarChart2 size={14} /> Resumo</NavLink>
          
          <NavLink to="/financeiro/dre" style={{
             padding: '6px 12px', borderRadius: '6px',
             backgroundColor: !isResumo ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
             color: !isResumo ? 'var(--color-accent)' : 'var(--text-muted)',
             textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
             fontWeight: !isResumo ? 600 : 500, transition: 'all 0.2s',
             fontSize: '0.875rem'
          }}><FileText size={14} /> DRE</NavLink>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
