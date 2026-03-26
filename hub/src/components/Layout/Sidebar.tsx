import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, DollarSign, Settings, Target } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'Resumo Executivo', to: '/' },
  { icon: PieChart, label: 'Marketing & Ads', to: '/marketing' },
  { icon: DollarSign, label: 'Financeiro DRE', to: '/financeiro' },
  { icon: Target, label: 'OKRs & Metas', to: '/okrs' },
];

export const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <>
      {/* Primary Sidebar (Floating Expansion) */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: isHovered ? '260px' : '84px',
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-glass-border)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-glass-border)', display: 'flex', alignItems: 'center', height: '80px', minWidth: '260px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {/* Premium White SVG Logo (Brisa "B" Flower) */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="1" strokeOpacity="1"/>
                <path d="M16 6C18 10 21 12 26 14C21 16 18 18 16 26C14 18 10 16 6 14C10 12 14 10 16 6Z" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
                <path d="M16 2C19 8 23 10 30 14C23 18 19 24 16 30C13 24 7 18 2 14C7 10 13 8 16 2Z" stroke="white" strokeOpacity="0.4" strokeWidth="1" strokeLinejoin="round"/>
                <text x="16" y="21" fill="white" fontSize="14" fontFamily="serif" textAnchor="middle" fontWeight="normal">B</text>
              </svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}>Brisa Hub</h2>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '260px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '10px 12px', borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                backgroundColor: isActive && isHovered ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                border: isActive && isHovered ? '1px solid rgba(6, 182, 212, 0.2)' : '1px solid transparent',
                transition: 'all 0.2s',
                fontWeight: isActive ? 600 : 400
              })}
            >
              <div style={{ minWidth: '32px', display: 'flex', justifyContent: 'center' }}>
                <item.icon size={20} style={{ color: 'inherit' }} />
              </div>
              <span style={{ fontSize: '0.85rem', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '24px 12px', borderTop: '1px solid var(--color-glass-border)', minWidth: '260px' }}>
          <NavLink
            to="/config"
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '10px 12px', borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
              backgroundColor: isActive && isHovered ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
              border: isActive && isHovered ? '1px solid rgba(6, 182, 212, 0.2)' : '1px solid transparent',
              transition: 'all 0.2s',
              fontWeight: isActive ? 600 : 400
            })}
          >
            <div style={{ minWidth: '32px', display: 'flex', justifyContent: 'center' }}>
              <Settings size={20} style={{ color: 'inherit' }} />
            </div>
            <span style={{ fontSize: '0.85rem', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}>Configurações</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
