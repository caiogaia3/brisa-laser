import { Shield, Users, Server, CheckCircle2 } from 'lucide-react';

const usersList = [
  { id: 1, name: 'Marcio Brisa', role: 'CEO / CFO', access: 'Rede Brisa (Consolidado)', status: 'Ativo' },
  { id: 2, name: 'Gerente Laser', role: 'Gerente de Loja', access: 'Brisa Laser Apenas', status: 'Ativo' },
  { id: 3, name: 'Agência Grooway', role: 'Dev Partner', access: 'Todas as Lojas (Admin)', status: 'Ativo' }
];

export const Configuracoes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '8px' }}>Configurações do Sistema</h1>
        <p style={{ color: 'var(--text-muted)' }}>Gestão de Acessos e Saúde da Integração Multi-Fonte.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Gestão de Perfis */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: 'var(--color-primary)' }}>
              <Users size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Gestão de Perfis de Acesso</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Controle quem visualiza quais informações.</p>
            </div>
          </header>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-glass-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '12px 0', fontWeight: 500 }}>Usuário</th>
                <th style={{ padding: '12px 0', fontWeight: 500 }}>Cargo</th>
                <th style={{ padding: '12px 0', fontWeight: 500 }}>Nível de Visão</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '16px 0', color: 'var(--text-main)', fontWeight: 500 }}>{u.name}</td>
                  <td style={{ padding: '16px 0', color: 'var(--text-muted)' }}>{u.role}</td>
                  <td style={{ padding: '16px 0' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--color-accent)', fontSize: '0.75rem' }}>
                      {u.access}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--color-glass-border)', backgroundColor: 'transparent', color: 'var(--text-main)', fontWeight: 500, alignSelf: 'flex-start', cursor: 'pointer' }}>
            + Convidar Usuário
          </button>
        </div>

        {/* Saúde do Sistema de Sync */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--color-success)' }}>
              <Server size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Status de Integração (ETL)</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Monitoramento dos túneis de dados n8n & Supabase.</p>
            </div>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { source: 'Zandu API (Schedules & Invoices)', time: 'Há 5 minutos' },
              { source: 'Planilha Leads (Google Sheets)', time: 'Há 12 minutos' },
              { source: 'Meta Ads & Google Ads API', time: 'Há 1 hora' }
            ].map(source => (
              <div key={source.source} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>{source.source}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{source.time}</span>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: 'auto', padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-glass-border)' }}>
             <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={16} /> Data Warehouse (Supabase)</p>
             <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px' }}>Online & Protegido (RLS Ativo). Último snapshot: Hoje 02:00 AM.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
