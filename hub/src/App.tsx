import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';

import { Marketing } from './pages/Marketing';
import { Financeiro } from './pages/Financeiro';
import { FinanceiroResumo } from './pages/Financeiro/FinanceiroResumo';
import { FinanceiroDRE } from './pages/Financeiro/FinanceiroDRE';
import { Configuracoes } from './pages/Configuracoes';
import { Estrategia } from './pages/Estrategia';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="financeiro" element={<Financeiro />}>
            <Route index element={<FinanceiroResumo />} />
            <Route path="dre" element={<FinanceiroDRE />} />
          </Route>
          <Route path="estrategia" element={<Estrategia />} />
          <Route path="config" element={<Configuracoes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
