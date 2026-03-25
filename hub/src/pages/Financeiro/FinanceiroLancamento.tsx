import { LancamentoForm } from '../../components/Financeiro/LancamentoForm';

export const FinanceiroLancamento = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ marginBottom: '8px' }}>Lançamento Rápido</h1>
        <p>Entrada e saída de transações diárias associadas ao plano de contas.</p>
      </header>

      <section>
        <LancamentoForm />
      </section>
    </div>
  );
};
