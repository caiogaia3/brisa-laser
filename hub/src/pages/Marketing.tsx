import { useState } from 'react';
import { usePeriodStore } from '../store/usePeriodStore';
import { PageHeader } from '../components/Layout/PageHeader';
import { BarChart3, Target, Share2, Globe } from 'lucide-react';
import SummaryTab from '../components/Dashboard/SummaryTab';

export const Marketing = () => {
  const {  } = usePeriodStore(); // Placeholder for period context
  const [activeTab, setActiveTab] = useState<'resumo' | 'google' | 'meta' | 'analytics'>('resumo');

  // Leads data is now handled within specialized views or the summary if needed.
  // We keep the state here for future tab implementations (Google/Meta detailed tables).
  
  const tabStyle = (id: string) => ({
    padding: '6px 12px',
    borderRadius: '8px',
    backgroundColor: activeTab === id ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
    color: activeTab === id ? 'var(--color-primary)' : 'var(--text-muted)',
    border: activeTab === id ? '1px solid var(--color-primary)' : '1px solid transparent',
    boxShadow: activeTab === id ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
    cursor: 'pointer',
    fontSize: '0.7rem',
    fontWeight: activeTab === id ? 700 : 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <PageHeader 
        title="Marketing & Performance" 
        subtitle="Auditoria de mídia paga e rastreamento de leads multi-canal (Consolidado)."
      >
        <button onClick={() => setActiveTab('resumo')} style={tabStyle('resumo')}>
          <BarChart3 size={14} /> Resumo
        </button>
        <button onClick={() => setActiveTab('google')} style={tabStyle('google')}>
          <Target size={14} /> Google Ads
        </button>
        <button onClick={() => setActiveTab('meta')} style={tabStyle('meta')}>
          <Share2 size={14} /> Meta Ads
        </button>
        <button onClick={() => setActiveTab('analytics')} style={tabStyle('analytics')}>
          <Globe size={14} /> Analytics
        </button>
      </PageHeader>

      {activeTab === 'resumo' && (
        <SummaryTab />
      )}

      {activeTab !== 'resumo' && (
        <div className="liquid-glass" style={{ padding: '64px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-main)', marginBottom: '16px' }}>Visão {activeTab.toUpperCase()} em desenvolvimento</h2>
          <p style={{ color: 'var(--text-muted)' }}>Esta aba apresentará métricas detalhadas via API direta em breve.</p>
        </div>
      )}
    </div>
  );
};
