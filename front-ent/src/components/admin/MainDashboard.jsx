import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const MainDashboard = ({attendanceData}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-600">Total Students</h3>
            <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-green-600">Average Attendance</h3>
            <p className="text-2xl font-bold">85%</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-yellow-600">Defaulters</h3>
            <p className="text-2xl font-bold">45</p>
        </div>
        </div>

        <div className="h-64">
        <h3 className="text-lg font-medium mb-4">Attendance Trends</h3>
        <LineChart width={800} height={200} data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="percentage" stroke="#2563eb" name="Attendance %" />
        </LineChart>
        </div>
    </div>
  )
}

export default MainDashboard
