const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctors,
  bookAppointmentController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes

router.post("/login", loginController);
router.post("/register", registerController);

// auth routes
router.post("/getUserData", authMiddleware, authController);

// Apply as doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification doctor method  post
router.post(
  "/get-all-notifications",
  authMiddleware,
  getAllNotificationController
);
router.post(
  "/delete-all-notifications",
  authMiddleware,
  deleteAllNotificationController
);
// Get all doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctors);

// for booking appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);
module.exports = router;
