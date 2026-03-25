import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, DollarSign, Settings, BarChart2, FileText } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const isFinanceiro = location.pathname.startsWith('/financeiro');

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
              {/* Premium White SVG Logo */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                padding: '12px', borderRadius: 'var(--radius)',
                textDecoration: 'none',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                backgroundColor: isActive && isHovered ? 'var(--color-primary-light)' : 'transparent',
                border: isActive && isHovered ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                transition: 'all 0.2s',
                fontWeight: isActive ? 600 : 400
              })}
            >
              <div style={{ minWidth: '36px', display: 'flex', justifyContent: 'center' }}>
                <item.icon size={24} style={{ color: 'inherit' }} />
              </div>
              <span style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div style={{ padding: '24px 12px', borderTop: '1px solid var(--color-glass-border)', minWidth: '260px' }}>
          <div style={{ padding: '12px', display: 'flex', gap: '16px', alignItems: 'center', borderRadius: 'var(--radius-lg)', background: isHovered ? 'rgba(255,255,255,0.03)' : 'transparent', transition: 'background 0.3s' }}>
            <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
              MB
            </div>
            <div style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Marcio Brisa</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CEO</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Sub-sidebar for Financeiro */}
      <aside style={{
        position: 'fixed',
        left: '84px',
        top: 0,
        height: '100vh',
        width: isFinanceiro ? '220px' : '0px',
        backgroundColor: '#0c0c14', /* Slightly darker than surface for depth */
        borderRight: isFinanceiro ? '1px solid var(--color-glass-border)' : 'none',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        zIndex: 40
      }}>
        <div style={{ padding: '24px', height: '80px', display: 'flex', alignItems: 'center', minWidth: '220px' }}>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Módulo Financeiro</h3>
        </div>
        <nav style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '220px' }}>
          <NavLink to="/financeiro" end style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: '8px',
            textDecoration: 'none', color: isActive ? 'var(--color-primary)' : 'var(--text-main)',
            backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
            fontSize: '0.875rem', transition: 'all 0.2s',
            fontWeight: isActive ? 600 : 400
          })} className="hover:bg-white/5">
            <BarChart2 size={16} /> Visão Executiva
          </NavLink>
          
          <NavLink to="/financeiro/lancamento" style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: '8px',
            textDecoration: 'none', color: isActive ? 'var(--color-primary)' : 'var(--text-main)',
            backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
            fontSize: '0.875rem', transition: 'all 0.2s',
            fontWeight: isActive ? 600 : 400
          })} className="hover:bg-white/5">
            <Settings size={16} /> Tático (Lançamentos)
          </NavLink>

          <NavLink to="/financeiro/dre" style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: '8px',
            textDecoration: 'none', color: isActive ? 'var(--color-accent)' : 'var(--text-main)',
            backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
            fontSize: '0.875rem', transition: 'all 0.2s',
            fontWeight: isActive ? 600 : 400
          })} className="hover:bg-white/5">
            <FileText size={16} /> Visão Contábil (DRE)
          </NavLink>
        </nav>
      </aside>
    </>
  );
};
