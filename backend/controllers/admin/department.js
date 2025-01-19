const Department = require('../../models/departmentSchema');
const handleError = require('../../services/Error');



const addDepartment = async(req, res) =>{

    try{

        const data = req.body;
        console.log(data)
        const newDepartment = new Department(data);
        console.log(newDepartment);
        await newDepartment.save()
        res.json('created new department')
    }
    catch(error){
        console.log('error', error);
        handleError(error, res)
    }
}

const getAllDepartments = async (req, res) => {
    try {
      const departments = await Department.find();
      res.status(200).json({ success: true, data: departments });
    } catch (error) {
      handleError(error, res);
    }
};

module.exports = {
    addDepartment,
    getAllDepartments
}