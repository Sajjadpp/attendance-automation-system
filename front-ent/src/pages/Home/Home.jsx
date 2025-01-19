import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = (param) =>{

    navigate(`login?user=${param}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">AttendEase</h1>
            </div>
            <div className="relative">
                <button 
                    onClick={() => navigate('/signup')} 
                    className="px-4 py-2 mr-5 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    signup
                </button>
              <button 
                onClick={toggleDropdown}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login Options
                <span className="ml-2">▼</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a
                    onClick={()=> handleLogin("Admin")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin Login
                  </a>
                  <a
                    onClick={()=> handleLogin('Staff')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Staff Login
                  </a>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Streamline Your Attendance Management
            </h2>
            <p className="text-xl text-gray-600">
              Transform the way you track and manage student attendance with our automated system. 
              Save time, increase accuracy, and make data-driven decisions.
            </p>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Key Features:</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Real-time attendance tracking
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Automated reports generation
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Multiple user roles
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span> Analytics dashboard
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="/api/placeholder/500/400"
              alt="Attendance System Interface" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
