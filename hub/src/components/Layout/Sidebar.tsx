
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, DollarSign, Settings, Bot } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'Resumo Executivo', to: '/' },
  { icon: PieChart, label: 'Marketing & Ads', to: '/marketing' },
  { icon: DollarSign, label: 'Financeiro DRE', to: '/financeiro' },
  { icon: Settings, label: 'Configurações', to: '/config' },
];

export const Sidebar = () => {
  return (
    <aside style={{ 
      width: '260px', 
      backgroundColor: 'var(--color-surface)',
      borderRight: '1px solid var(--color-glass-border)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed'
    }}>
      <div className="flex-center" style={{ padding: '24px', borderBottom: '1px solid var(--color-glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            width: '32px', height: '32px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Bot size={20} color="white" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Brisa Hub</h2>
        </div>
      </div>
      
      <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px', paddingLeft: '8px' }}>
          Menu Principal
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: 'var(--radius)',
              textDecoration: 'none',
              color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
              backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s',
              fontWeight: isActive ? 500 : 400
            })}
          >
            <item.icon size={20} style={{ color: 'inherit' }} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div style={{ padding: '24px', borderTop: '1px solid var(--color-glass-border)' }}>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
            MB
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Marcio Brisa</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CEO</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
