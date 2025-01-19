
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const StudentLayout = () => {
  return (
    <>
      <Navbar role="student" />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default StudentLayout;