const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctrosController,
} = require("../controllers/adminController");

const router = express.Router();

// get method for users

router.get("/getAllUsers", authMiddleware, getAllUsersController);

router.get("/getAllDoctors", authMiddleware, getAllDoctrosController);
