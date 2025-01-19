
import NotFound from '../pages/NotFound';
import AdminDashboard from '../pages/admin/Dashboard';
import ManageStaff from '../pages/admin/ManageStaff';
import ManageClasses from '../pages/admin/ManageClasses';
import StaffDashboard from '../pages/staff/Dashboard';
import ManageStudents from '../pages/staff/ManageStudents';
import StudentDashboard from '../pages/student/Dashboard';
import Attendance from '../pages/student/Attendance';
import Home from '../pages/Home/Home';
import LoginPage from '../pages/Account/Login/Login';
import Signup from '../pages/Account/Signup/Signup';
import PendingApproval from '../pages/loginRequested/LoginRequested';

const routes = {
  public: [
    { path: '/loginRequested', element: PendingApproval },
    { path: '/login', element: LoginPage },
    { path: '/signup', element: Signup },
    { path: '/', element: Home },
    { path: '*', element: NotFound  },
  ],
  admin: [
    { path: '', element: AdminDashboard },
    { path: 'manage-staff', element: ManageStaff },
    { path: 'manage-classes', element: ManageClasses },
  ],
  staff: [
    { path: '', element: StaffDashboard },
    { path: 'manage-students', element: ManageStudents },
  ],
  student: [
    { path: '', element: StudentDashboard },
    { path: 'attendance', element: Attendance },
  ],
};

export default routes;