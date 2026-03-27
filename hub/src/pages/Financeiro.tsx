import { Outlet, NavLink } from 'react-router-dom';
import { BarChart2, FileText } from 'lucide-react';
import { PageHeader } from '../components/Layout/PageHeader';

export const Financeiro = () => {

  const getTabStyle = (isActive: boolean) => ({
    padding: '6px 12px',
    borderRadius: '8px',
    backgroundColor: isActive ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
    color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
    border: isActive ? '1px solid var(--color-primary)' : '1px solid transparent',
    boxShadow: isActive ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: isActive ? 700 : 500,
    transition: 'all 0.2s',
    fontSize: '0.7rem',
  });

  return (
    <div style={{ width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PageHeader 
        title="Financeiro" 
        subtitle="Radar estratégico e auditoria financeira detalhada da operação."
      >
        <NavLink to="/financeiro" end style={({ isActive }) => getTabStyle(isActive)}>
          <BarChart2 size={14} /> Resumo
        </NavLink>
        
        <NavLink to="/financeiro/dre" style={({ isActive }) => getTabStyle(isActive)}>
          <FileText size={14} /> DRE
        </NavLink>
      </PageHeader>
      <Outlet />
    </div>
  );
};
