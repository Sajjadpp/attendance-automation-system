const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {type: String,required: true,unique: true},
  code: {type: String,required: true,unique: true},
  HOD:{type: String,required: true,uniquie: true,},
  totalStudents:{type: Number,default: 0,},
  createdAt: {type: Date,default: Date.now,},
  faculties:[{type: mongoose.Types.ObjectId}]
});

module.exports = mongoose.model('Department', departmentSchema);
