import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { staffAxiosInstance } from '../../service/axiosConstants';

const PendingApproval = () => {
  const navigate = useNavigate();

  const fetchIsAllowed = async() =>{

    try{
      const response= await staffAxiosInstance.get("/");
      console.log(response)
      if(response.data.isAllowed){
        navigate('/staff')
      }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchIsAllowed()
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800">Request Submitted</h2>
        <p className="mt-2 text-gray-600">
          Your account is awaiting admin approval. You will be notified once your access is granted.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/login')}
          className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;
