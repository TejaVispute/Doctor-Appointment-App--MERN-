const express = require("express");
const {
    getAllUsersController,
    getAllDoctrosController,
    changeAccountStatusController
} = require("../controllers/adminController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// get method for users

router.get("/getAllUsers", authMiddleware, getAllUsersController);

// get method for all doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctrosController);

// post account status 
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

module.exports = router;
