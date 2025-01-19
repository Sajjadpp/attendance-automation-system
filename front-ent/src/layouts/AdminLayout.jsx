// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminLayout = () => {
  return (
    <>
      <Navbar role="admin" />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;