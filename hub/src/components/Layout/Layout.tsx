import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ChatPanel } from '../Chat/ChatPanel';

export const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const isFinanceiro = location.pathname.startsWith('/financeiro');

  // Desktop offsets: Base Sidebar is 84px. If Subsidebar is open, it adds 220px. (Total = 304px)
  const marginLeft = isFinanceiro ? '304px' : '84px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft, display: 'flex', flexDirection: 'column', transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <Header onOpenChat={() => setIsChatOpen(true)} />
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }} className="animate-fade-in">
          <Outlet />
        </main>
      </div>
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};
