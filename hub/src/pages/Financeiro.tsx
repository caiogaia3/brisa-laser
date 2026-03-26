import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BarChart2, FileText } from 'lucide-react';

export const Financeiro = () => {
  const location = useLocation();
  const isResumo = location.pathname === '/financeiro';

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ marginBottom: '8px' }}>Módulo Financeiro (CFO)</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Acompanhamento de saúde financeira e demonstrativos de resultados.</p>
        
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--color-glass-border)', paddingBottom: '0' }}>
          <NavLink to="/financeiro" end style={{
             padding: '8px 16px', 
             borderBottom: isResumo ? '2px solid var(--color-primary)' : '2px solid transparent',
             color: isResumo ? 'var(--text-main)' : 'var(--text-muted)',
             textDecoration: 'none',
             display: 'flex', alignItems: 'center', gap: '8px',
             fontWeight: isResumo ? 600 : 400,
             transition: 'all 0.2s'
          }}><BarChart2 size={16} /> Resumo Executivo</NavLink>
          
          <NavLink to="/financeiro/dre" style={{
             padding: '8px 16px', 
             borderBottom: !isResumo ? '2px solid var(--color-accent)' : '2px solid transparent',
             color: !isResumo ? 'var(--text-main)' : 'var(--text-muted)',
             textDecoration: 'none',
             display: 'flex', alignItems: 'center', gap: '8px',
             fontWeight: !isResumo ? 600 : 400,
             transition: 'all 0.2s'
          }}><FileText size={16} /> DRE Detalhado</NavLink>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
