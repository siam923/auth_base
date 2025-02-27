// src/routes/auth.js
import express from "express";
import {
  forgotPassword,
  getProfile,
  login,
  refreshToken,
  register,
  resetPassword,
  updateUserRole,
} from "#src/controllers/authController.js";
import { getUserByToken, updateUser } from "#src/controllers/userController.js";
import authMiddleware, {authorize} from "#src/middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth route" });
});
router.post("/getUser", getProfile);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
// password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
// user update 
router.put("/update", authMiddleware, updateUser);
router.get("/user/", authMiddleware, getUserByToken);

// Admin routes
router.put('/:id/role', authMiddleware, authorize('Admin'), updateUserRole);

export default router;
