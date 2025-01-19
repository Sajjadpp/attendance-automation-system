import React from 'react'

const AddStudent = ({classes}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Student</h2>
        <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Full Name
            </label>
            <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Roll Number
            </label>
            <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Class
            </label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Class</option>
                {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
                ))}
            </select>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
        </div>
        <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
            Add Student
        </button>
        </form>
    </div>
  )
}

export default AddStudent
