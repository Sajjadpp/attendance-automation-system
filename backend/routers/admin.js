const express = require('express');
const { addDepartment, getAllDepartments } = require('../controllers/admin/department');
const { pendingFaculty, approveFaculty, getAllStaff } = require('../controllers/admin/faculty');
const admin = express.Router();

admin.post('/login');

admin.post("/department", addDepartment)

admin.get('/department', getAllDepartments)

admin.get("/faculty/pending", pendingFaculty)

admin.patch("/faculty/approve/:id", approveFaculty)

admin.get('/staff', getAllStaff)

module.exports = admin;