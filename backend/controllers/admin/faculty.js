const Staff = require('../../models/StaffSchema');
const handleError = require('../../services/Error');

const approveFaculty = async (req, res) => {
    const { id } = req.params;
    const { isAllowed } = req.body;
  
    try {
      await Staff.findByIdAndUpdate(id, { isAllowed });
      res.status(200).json({ message: 'Status updated' });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Error updating status' });
    }
};
  

const pendingFaculty = async (req, res) => {
    try {
      const pendingFaculty = await Staff.find({ isAllowed: false });
      res.status(200).json(pendingFaculty);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Error fetching pending faculty' });
    }
};

const getAllStaff = async(req, res) =>{

    try{
        const allStaff = await Staff.find().populate('department')
        console.log(allStaff)
        res.json(allStaff)
    }
    catch(error){
        console.log(error);
        handleError(error, res)
    }
}



module.exports = {
    approveFaculty,
    pendingFaculty,
    getAllStaff
}