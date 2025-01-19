import React, { useEffect, useState } from 'react';
import { adminAxiosInstance } from '../../../service/axiosConstants';

const StaffManagement = () => {
    const [staffMembers, setStaffMembers] = useState([])
    const fetchStaff = async() =>{
        try{
            const response = await adminAxiosInstance.get("/staff");
            console.log(response.data)
            setStaffMembers(response.data);
        }
        catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        fetchStaff();
    },[])

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');

    const departments = ['all', 'Computer Science', 'Mechanical Engineering', 'Electrical Engineering'];

    const filteredStaff = staffMembers.filter(staff => {
        const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            staff?.expertise?.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDepartment = selectedDepartment === 'all' || staff.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    return (
        <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <input
                type="text"
                placeholder="Search by name, role, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="w-full md:w-64">
                <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                {departments.map(dept => (
                    <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                    </option>
                ))}
                </select>
            </div>
            </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
                <div key={staff.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className='w-16 h-16 rounded-full object-cover'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                        </div>
                        <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
                        <p className="text-sm text-gray-600">{staff.role}</p>
                        <p className="text-sm text-blue-600">{staff.department.name}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {staff.status}
                        </span>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div>
                        <h4 className="text-sm font-medium text-gray-700">Contact Information</h4>
                        <p className="text-sm text-gray-600">{staff.email}</p>
                        <p className="text-sm text-gray-600">{staff.phone}</p>
                        </div>

                        <div>
                        <h4 className="text-sm font-medium text-gray-700">Office Hours</h4>
                        <p className="text-sm text-gray-600">{staff.officeHours}</p>
                        </div>

                        <div>
                        <h4 className="text-sm font-medium text-gray-700">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {staff?.expertise?.map((exp, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                            >
                                {exp}
                            </span>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                        View Profile
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-800">
                        Message
                    </button>
                    </div>
                </div>
            ))}
        </div>

        {filteredStaff.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No staff members found matching your search criteria.</p>
            </div>
        )}
        </div>
    );
};

export default StaffManagement;