import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ChatPanel } from '../Chat/ChatPanel';

export const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <Header onOpenChat={() => setIsChatOpen(true)} />
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }} className="animate-fade-in">
          <Outlet />
        </main>
      </div>
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};
