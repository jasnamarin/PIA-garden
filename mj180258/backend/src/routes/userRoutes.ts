import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import * as userController from "../controllers/userController";

const router = express.Router();

// Any user can log in
router.post("/login", userController.loginUser);

// Any user can update their own data
router.put("/update-user", authenticateToken, userController.updateUserData);

// Any user can change their own password
router.put(
  "/update-password",
  authenticateToken,
  userController.updatePassword
);

export default router;
