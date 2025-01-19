const express = require('express');
const { addStaff, faculty } = require('../controllers/staff/staffContoller');
const { authenticate } = require('../middlewares/Auth');
const staff = express.Router();



staff.get('/')
staff.post('/', addStaff)
staff.get('/', authenticate, faculty)

module.exports = staff;