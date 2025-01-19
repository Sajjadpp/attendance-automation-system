import React, { useState } from 'react';
import AddStudent from '../../components/admin/AddStudent';
import MainDashboard from '../../components/admin/MainDashboard';
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import DepartmentPage from '../../components/admin/department/departmentPage';
import StaffManagement from '../../components/admin/staff/StaffPage';
import FacultyNotification from '../../components/admin/Notification/Notification';
import {AiFillBell} from 'react-icons/ai'
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedClass, setSelectedClass] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false); // Toggle state
    
    // Sample data
    const attendanceData = [
        { date: '2024-01', percentage: 85 },
        { date: '2024-02', percentage: 78 },
        { date: '2024-03', percentage: 92 }
    ];

    const classes = [
        'Computer Science - 1st Year',
        'Computer Science - 2nd Year',
        'Mechanical - 1st Year',
        'Mechanical - 2nd Year'
    ];

    // Sidebar menu items
    

    return (
        <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
            <Sidebar 
                activeTab={activeTab}
                setActiveTab={setActiveTab} 
                sidebarOpen={sidebarOpen}
            />

        {/* Main Content */}
        <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            {/* Top Navigation */}
            <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-600 hover:text-gray-900"
                >
                    ☰
                </button>
                <div className="flex items-center space-x-4">
                    
                    <span className="text-gray-700">Welcome, Admin</span>
                    <button className="text-gray-600 hover:text-gray-900">
                    Logout
                    </button>
                    <div onClick={()=> setShowPopup(!showPopup)}>
                        <AiFillBell color='red'/>
                    </div>
                </div>
                </div>
            </div>
            </nav>

            {/* Page Content */}
            <div className="p-8">

                <FacultyNotification
                    setShowPopup={setShowPopup}
                    showPopup={showPopup}
                />

            {activeTab === 'students' && (
                <AddStudent classes={classes}/>
            )}

            {activeTab === 'dashboard' && (
                <MainDashboard attendanceData={attendanceData}/>
            )}

            {activeTab === 'departments' && (
                <DepartmentPage />
            )}
            
            {activeTab === 'staff' && (
                <StaffManagement />
            )}

            {/* Add other tab contents here */}
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;