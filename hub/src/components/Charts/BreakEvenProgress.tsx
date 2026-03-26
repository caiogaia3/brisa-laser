export const BreakEvenProgress = ({ data }: { data: any }) => {
  if (!data) return null;

  const receita = Number(data.receita_bruta || 0);
  const breakeven = Number(data.breakeven || 0);
  const target = breakeven > 0 ? breakeven : 10000;
  
  const percentage = Math.min((receita / target) * 100, 100);
  const isComplete = percentage >= 100;
  const color = isComplete ? 'var(--color-success)' : 'var(--color-primary)';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'flex-end' }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Progresso Atual</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: color, lineHeight: 1 }}>{percentage.toFixed(1)}%</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Alvo (Break-even)</span>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>R$ {(target / 1000).toFixed(1)}k</div>
        </div>
      </div>

      <div style={{ position: 'relative', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${percentage}%`, 
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 15px ${color}40`,
            borderRadius: '20px',
            transition: 'width 1s ease-out'
          }} 
        />
        {/* Glowing dot at the end */}
        <div style={{ 
          position: 'absolute', 
          left: `calc(${percentage}% - 6px)`, 
          top: '50%', 
          transform: 'translateY(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: `0 0 10px #fff, 0 0 20px ${color}`,
          display: percentage > 5 ? 'block' : 'none'
        }} />
      </div>

      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <div style={{ 
          flex: 1, 
          padding: '10px', 
          background: 'rgba(255,255,255,0.02)', 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Faltam</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {isComplete ? 'META ATINGIDA' : `R$ ${Math.max(0, target - receita).toLocaleString('pt-BR')}`}
          </div>
        </div>
      </div>
    </div>
  );
};
