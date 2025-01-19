import React, { useState } from 'react';
import { Search, Download, Users, UserCheck, AlertCircle, LogOut, ChevronRight, Book } from 'lucide-react';

// Previous AttendanceView component (moved from main dashboard)
const AttendanceView = ({ classData, onBack }) => {
  const [students] = useState([
    { id: 1, name: 'John Doe', roll: '101', attendance: [] },
    { id: 2, name: 'Jane Smith', roll: '102', attendance: [] },
    { id: 3, name: 'Mike Wilson', roll: '103', attendance: [] },
    { id: 4, name: 'Sarah Brown', roll: '104', attendance: [] },
  ]);

  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSelectStudent = (studentId) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-gray-600">
        <button onClick={onBack} className="hover:text-blue-600">Classes</button>
        <ChevronRight size={16} />
        <span className="font-medium text-gray-900">{classData.name}</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
            <Users className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Present Today</p>
              <p className="text-2xl font-bold">{selectedStudents.size}</p>
            </div>
            <UserCheck className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Absent Today</p>
              <p className="text-2xl font-bold">{students.length - selectedStudents.size}</p>
            </div>
            <AlertCircle className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name or roll number..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Submit Attendance
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Present
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.has(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">{student.roll}</td>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedStudents.has(student.id)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedStudents.has(student.id) ? 'Present' : 'Absent'}
                    </span>
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

// Main Dashboard Component
const StaffDashboard = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes] = useState([
    { id: 1, name: 'Class 10-A', subject: 'Mathematics', students: 35 },
    { id: 2, name: 'Class 9-B', subject: 'Physics', students: 40 },
    { id: 3, name: 'Class 11-C', subject: 'Chemistry', students: 38 },
    { id: 4, name: 'Class 12-D', subject: 'Biology', students: 42 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              <Book className="text-blue-600" size={32} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">School Attendance System</h1>
                <p className="text-sm text-gray-500">Staff Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">John Smith</p>
                <p className="text-sm text-gray-500">Mathematics Department</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {selectedClass ? (
          <AttendanceView 
            classData={selectedClass} 
            onBack={() => setSelectedClass(null)} 
          />
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => setSelectedClass(classItem)}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                  <p className="text-gray-500">{classItem.subject}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-600">{classItem.students} Students</span>
                    <ChevronRight className="text-gray-400" size={16} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StaffDashboard;