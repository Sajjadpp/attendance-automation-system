const handleError = require("../../services/Error");
const Staff = require('../../models/StaffSchema');
const { generateToken } = require("../../services/jwt");

const addStaff = async(req, res) =>{

    try{
        let data = req.body;

        let userExist = await Staff.findOne({email: data.email})
        if(userExist) return res.status(500).json('user already exist')
        
        let newStaff = new Staff(data);

        await newStaff.save();
        let token = generateToken({_id:newStaff._id, email:newStaff.email}, '1d');
        res.cookie('authToken', token, {
            httpOnly: true, // Prevent access by client-side JavaScript
            secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
            sameSite: 'strict', // Prevent CSRF
            maxAge: 60 * 60 * 1000 * 24, // 1 hour
        });
        res.json('requested to administrator')
    }
    catch(error){
        console.log(error)
        handleError(error, res)
    }
}

const faculty = async(req, res) =>{
    console.log(req.user)
    try{
        let facultyData = await Staff.findOne({_id: req.user._id});
        console.log(facultyData)
        if(!facultyData) return res.status(409).json('no faculty exist')
        res.json(facultyData)

    }
    catch(error){
        console.log(error);
        handleError(error, res)
    }
}

module.exports = {
    addStaff,
    faculty
}