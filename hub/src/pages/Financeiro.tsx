import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BarChart2, FileText } from 'lucide-react';
import { PageHeader } from '../components/Layout/PageHeader';

export const Financeiro = () => {
  const location = useLocation();
  const isResumo = location.pathname === '/financeiro';

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PageHeader 
        title="Financeiro" 
        subtitle="Radar estratégico e auditoria financeira detalhada da operação."
      >
        <NavLink to="/financeiro" end style={{
           padding: '8px 16px', borderRadius: '8px',
           backgroundColor: isResumo ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
           color: isResumo ? 'var(--color-primary)' : 'var(--text-muted)',
           textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
           fontWeight: isResumo ? 700 : 500, transition: 'all 0.2s',
           fontSize: '0.75rem', border: isResumo ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent'
        }}><BarChart2 size={14} /> Resumo</NavLink>
        
        <NavLink to="/financeiro/dre" style={{
           padding: '8px 16px', borderRadius: '8px',
           backgroundColor: !isResumo ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
           color: !isResumo ? 'var(--color-accent)' : 'var(--text-muted)',
           textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
           fontWeight: !isResumo ? 700 : 500, transition: 'all 0.2s',
           fontSize: '0.75rem', border: !isResumo ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent'
        }}><FileText size={14} /> DRE</NavLink>
      </PageHeader>
      <Outlet />
    </div>
  );
};
