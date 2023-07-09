const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController
} = require('../controllers/doctorController');

// get Doctor info

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

// for update doctor
router.post('/updateProfile', authMiddleware, updateProfileController);

// POST get single doctor Info from home page when someone clicks on tht doctor card

router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

module.exports = router; 