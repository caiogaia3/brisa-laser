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
      <div style={{ 
        flex: 1, 
        minWidth: 0, /* Prevent flex child from growing to content size */
        marginLeft: '84px', 
        display: 'flex', 
        flexDirection: 'column', 
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowX: 'hidden'
      }}>
        <Header onOpenChat={() => setIsChatOpen(true)} />
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto', minWidth: 0 }} className="animate-fade-in">
          <Outlet />
        </main>
      </div>
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};
