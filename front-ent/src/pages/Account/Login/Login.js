import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  // Initial state based on user type
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userType = queryParams.get('user')
  
  const initialState = {
    username: '',
    password: '',
    ...(userType === 'Admin' && { adminCode: '' }),
    ...(userType === 'Staff' && { department: '', employeeId: '' }),
    ...(userType === 'Student' && { rollNumber: '', semester: '' })
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // User type specific validations
    if (userType === 'Admin') {
      if (!formData.adminCode || !/^\d{6}$/.test(formData.adminCode)) {
        newErrors.adminCode = 'Admin code must be 6 digits';
      }
    }

    if (userType === 'Staff') {
      if (!formData.department) {
        newErrors.department = 'Department is required';
      }
      if (!formData.employeeId || !/^[A-Z]{2}\d{4}$/.test(formData.employeeId)) {
        newErrors.employeeId = 'Invalid Employee ID format (e.g., EMP1234)';
      }
    }

    if (userType === 'Student') {
      if (!formData.rollNumber || !/^\d{8}$/.test(formData.rollNumber)) {
        newErrors.rollNumber = 'Roll number must be 8 digits';
      }
      if (!formData.semester) {
        newErrors.semester = 'Semester is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(`${userType} login attempt:`, formData);
      // Add your authentication logic here
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  // Get departments list - could be fetched from API
  const departments = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical'
  ];

  // Get semesters list
  const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-xl font-bold text-blue-600 text-center">AttendEase</h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {userType} Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Common Fields */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Admin-specific fields */}
            {userType === 'Admin' && (
              <div>
                <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700">
                  Admin Code
                </label>
                <div className="mt-1">
                  <input
                    id="adminCode"
                    name="adminCode"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.adminCode}
                    onChange={handleChange}
                  />
                  {errors.adminCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.adminCode}</p>
                  )}
                </div>
              </div>
            )}

            {/* Staff-specific fields */}
            {userType === 'Staff' && (
              <>
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                    Employee ID
                  </label>
                  <div className="mt-1">
                    <input
                      id="employeeId"
                      name="employeeId"
                      type="text"
                      required
                      placeholder="EMP1234"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.employeeId}
                      onChange={handleChange}
                    />
                    {errors.employeeId && (
                      <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <div className="mt-1">
                    <select
                      id="department"
                      name="department"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Student-specific fields */}
            {userType === 'Student' && (
              <>
                <div>
                  <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
                    Roll Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="rollNumber"
                      name="rollNumber"
                      type="text"
                      required
                      placeholder="12345678"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.rollNumber}
                      onChange={handleChange}
                    />
                    {errors.rollNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.rollNumber}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                    Semester
                  </label>
                  <div className="mt-1">
                    <select
                      id="semester"
                      name="semester"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.semester}
                      onChange={handleChange}
                    >
                      <option value="">Select Semester</option>
                      {semesters.map(sem => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                    {errors.semester && (
                      <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="mt-2 text-center">
                <a href="/" className="text-sm text-blue-600 hover:text-blue-500">
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;