import React from 'react';
import { Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SuccessNotification = ({ message = "Request completed successfully" }) => {
  return (
    <Alert className="bg-green-50 border-green-600 max-w-md">
      <Check className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-800 font-medium">Success</AlertTitle>
      <AlertDescription className="text-green-700">
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default SuccessNotification