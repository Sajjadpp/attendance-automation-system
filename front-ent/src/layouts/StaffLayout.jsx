
// src/layouts/StaffLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const StaffLayout = () => {
  return (
    <>
      <Navbar role="staff" />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default StaffLayout;