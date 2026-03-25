import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';

import { Marketing } from './pages/Marketing';
import { Financeiro } from './pages/Financeiro';
import { FinanceiroResumo } from './pages/Financeiro/FinanceiroResumo';
import { FinanceiroLancamento } from './pages/Financeiro/FinanceiroLancamento';
import { FinanceiroDRE } from './pages/Financeiro/FinanceiroDRE';

const Config = () => <div><h1 style={{ marginBottom: '8px' }}>Configurações</h1><p>Em breve...</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="financeiro" element={<Financeiro />}>
            <Route index element={<FinanceiroResumo />} />
            <Route path="lancamento" element={<FinanceiroLancamento />} />
            <Route path="dre" element={<FinanceiroDRE />} />
          </Route>
          <Route path="config" element={<Config />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
