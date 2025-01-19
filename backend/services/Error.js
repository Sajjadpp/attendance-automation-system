const handleError = (error, res) => {
    // Log the error details for debugging
    console.error('Error:', error);
  
    // Handle specific error types
    if (error.name === 'ValidationError') {
      return res.status(400).json('Validation Error');
    }
  
    if (error.name === 'CastError') {
      return res.status(400).json('Invalid ID format');
    }
  
    if (error.code && error.code === 11000) {
      // Handle duplicate key error (MongoDB)
      return res.status(409).json('Duplicate entry detected');
    }
  
    // Check for custom errors
    if (error.statusCode) {
      return res.status(error.statusCode).json(error.message);
    }
  
    // Default to 500 for unexpected errors
    res.status(500).json('Server Error');
  };
  
module.exports = handleError;
  