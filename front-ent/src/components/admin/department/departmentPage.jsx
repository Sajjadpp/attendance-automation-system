import React, { useEffect, useState } from 'react';
import { adminAxiosInstance } from '../../../service/axiosConstants';

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);

  const fetchDepartment = async() =>{
    try{
      let response = await adminAxiosInstance.get('/department')
      setDepartments(response.data.data);
    }
    catch(error){
      console.log(error)
    }
  }

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    HOD: '',
    code: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = departments.length + 1;

    try{

      const response = await adminAxiosInstance.post('/department', newDepartment);
      setDepartments([...departments, { ...newDepartment, id, totalStudents: 0 }]);
      setNewDepartment({ name: '', HOD: '', code: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    catch(error){
      console.log(error)
    } 
    
  };

  useEffect(()=>{
    fetchDepartment()
  },[])

  return (
    <div className="space-y-6">
      {/* Add Department Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Department</h2>
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">
            Department added successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                required
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Head of Department
              </label>
              <input
                type="text"
                required
                value={newDepartment.HOD}
                onChange={(e) => setNewDepartment({...newDepartment, HOD: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                code
              </label>
              <input
                type="text"
                required
                value={newDepartment.code}
                onChange={(e) => setNewDepartment({...newDepartment, code: e.target.value})}
                className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Department
          </button>
        </form>
      </div>

      {/* Departments List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b border-gray-200">
          Departments List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Head of Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dept.HOD}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dept.totalStudents}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;