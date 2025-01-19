// src/router/index.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import StaffLayout from '../layouts/StaffLayout';
import StudentLayout from '../layouts/StudentLayout';

const createRouter = (routes) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>          
          {routes.public.map(({ path, element:Element }, index) => (
            <Route key={index} path={path} element={<Element/>} />
          ))}
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          {routes.admin.map(({ path, element:Element }, index) => (
            <Route key={index} path={path} element={<Element/>} />
          ))}
        </Route>

        <Route path="/staff" element={<StaffLayout />}>
          {routes.staff.map(({ path, element:Element }, index) => (
            <Route key={index} path={path} element={<Element/>} />
          ))}
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          {routes.student.map(({ path, element:Element }, index) => (
            <Route key={index} path={path} element={<Element/>} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default createRouter;