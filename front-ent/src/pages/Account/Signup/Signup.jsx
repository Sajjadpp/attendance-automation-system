import React, { useState, useEffect } from 'react';
import { adminAxiosInstance, staffAxiosInstance } from '../../../service/axiosConstants';
import { validateForm } from '../validation/signupValidation';
import EmailErrorDisplay from '../../../components/CommonDiplay/EmailErrorDisplay';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
        classes: [],
    });
    const [emailErr, setEmailErr] = useState(false)
    const [errors, setErrors] = useState({});
    const [departments, setDepartments] = useState([]);
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch departments from backend
        const fetchDepartments = async () => {
        const response = await adminAxiosInstance.get('/department'); // Adjust API endpoint
        
        const data = response.data.data
        setDepartments(data);
        };
        
        // Fetch classes (if required based on department selection)
        const fetchClasses = async () => {
        const response = await fetch('/api/classes'); // Adjust API endpoint
        const data = await response.json();
        setClasses(data);
        };

        fetchDepartments();
        fetchClasses();
    }, []);

    

    // Form validation and handlers remain the same
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validateForm(formData, setErrors)) {
            console.log('Faculty signup data:', {
                ...formData,
                role: 'faculty'
            });
    
            try {
                // Await the API call to handle the Promise correctly
                const response = await staffAxiosInstance.post('/', {
                    ...formData,
                    role: "faculty"
                });
    
                console.log('Signup Successful:', response.data);
                navigate('/loginRequested')
                // Optional: Redirect or show a success message here
    
            } catch (error) {
                console.error('Signup Error:', error);
                
                // Check if the error is due to a duplicate email
                if (error.response && error.response.status === 409) {
                    setEmailErr('Email already exists');
                } else {
                    setEmailErr('Signup failed. Please try again.');
                }
            }
        }
    };
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e3f2fd,transparent)]" />
      <div className="relative z-10 flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo/Brand Section */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl shadow-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">AE</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              AttendEase
            </h1>
            <h2 className="mt-2 text-center text-sm font-medium text-gray-600 max-w-sm">
              Faculty Registration Portal
            </h2>
          </div>
        </div>

        

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 backdrop-blur-sm py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Field */}
                <EmailErrorDisplay
                    isVisible={emailErr}
                    onClose={()=> setEmailErr(false)}
                />
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                    </div>
                </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password Fields Group */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Department Field */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    id="department"
                    name="department"
                    required
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map(department => (
                      <option key={department._id} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                  )}
                </div>
              </div>

              {/* Assigned Class Field */}
              <div>
                <label htmlFor="assignedClass" className="block text-sm font-medium text-gray-700">
                  Assigned Class
                </label>
                <div className="mt-1 relative rounded-md shadow-sm flex">

                  
                  {
                    classes.length ? 
                    classes.map((classN) =>(
                        <div className='p-5 px-7 rounded-md border-black bg-green-300'>
                            hi
                        </div>
                    ))
                    : 
                    "empty classes"
                  }

                    
                  
                  {errors.assignedClass && (
                    <p className="mt-1 text-sm text-red-600">{errors.assignedClass}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  Request Permission
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <a 
                href="/login" 
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Already have an account? Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
