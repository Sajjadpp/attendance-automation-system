const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {type: String,required: true,},
  email: {type: String,required: true,unique: true,},
  password: {type: String,required: true,},
  department: {type: mongoose.Schema.Types.ObjectId,ref: 'Department',},
  classes: [{type: mongoose.Schema.Types.ObjectId,ref: 'Class'}],
  role: {type: String,default: 'faculty',},
  createdAt: {type: Date,default: Date.now,},
  isAllowed: {type: Boolean,default: false,required: false}
});

module.exports = mongoose.model('faculty', facultySchema);
