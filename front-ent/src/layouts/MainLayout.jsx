// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar role="public" />
      <main className="py-4">
        <Outlet />  {/* Renders child routes */}
      </main>
    </>
  );
};

export default MainLayout;
