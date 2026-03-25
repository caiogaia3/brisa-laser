import { Outlet } from 'react-router-dom';

export const Financeiro = () => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <Outlet />
    </div>
  );
};
