import React from 'react'

const Sidebar = ({sidebarOpen, setActiveTab, activeTab}) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'students', label: 'Add Students', icon: '👥' },
        { id: 'attendance', label: 'Attendance Reports', icon: '📋' },
        { id: 'defaulters', label: 'Defaulter List', icon: '⚠️' },
        { id: 'departments', label: 'Departments', icon: '🏢' },
        { id: 'staff', label: 'Staff Management', icon: '👨‍🏫' },
        { id: 'class', label: 'Class management', icon: '🏫' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];
    return (
        <div className={`bg-white shadow-lg w-64 fixed h-full transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}>
            {/* Logo Section */}
            <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600">AttendEase</h1>
            <p className="text-sm text-gray-600">Admin Panel</p>
            </div>

            {/* Menu Items */}
            <nav className="mt-6">
            {menuItems.map((item) => (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left ${
                    activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                </button>
            ))}
            </nav>
        </div>
    )
}

export default Sidebar
