import React, { useEffect, useState } from 'react';
import { adminAxiosInstance } from '../../../service/axiosConstants';

const FacultyNotification = ({showPopup, setShowPopup}) => {
    const [pendingFaculty, setPendingFaculty] = useState([]);

    useEffect(() => {
        try{
            adminAxiosInstance.get('/faculty/pending')
            .then(res => setPendingFaculty(res.data));
        }
        catch(error){
            console.log(error)
        }
        
    }, []);

    const handleApproval = (id, status) => {
        try{
            adminAxiosInstance.patch(`/faculty/approve/${id}`, {isAllowed: status})
            .then(() => {
                setPendingFaculty(prev => prev.filter(faculty => faculty._id !== id));
            });
        }catch(erro){
            console.log(erro)
        }
        
    };

    return (
        <div>
          {/* Popup */}
          {showPopup && (
            <div className="fixed top-16 right-4 space-y-4 z-50">
              {pendingFaculty.length > 0 ? (
                pendingFaculty.map(faculty => (
                  <div
                    key={faculty._id}
                    className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-80 animate-slide-in"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      Approval Request
                    </h4>
                    <p className="text-sm text-gray-600">Name: {faculty.name}</p>
                    <p className="text-sm text-gray-600">Email: {faculty.email}</p>
    
                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={() => handleApproval(faculty._id, true)}
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(faculty._id, false)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-80">
                  <p className="text-sm text-gray-600">No pending approvals.</p>
                </div>
              )}
            </div>
          )}
        </div>
    );
};

export default FacultyNotification;
