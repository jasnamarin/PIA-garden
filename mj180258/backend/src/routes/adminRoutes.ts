import express from "express";
import * as adminController from "../controllers/adminController";
import * as userController from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Admin can see all owners
router.get("/owners", adminController.getAllOwners);

// Admin can see all decorators
router.get("/decorators", adminController.getAllDecorators);

// Admin can see all firms
router.get("/firms", adminController.getAllFirms);

// Admin can update any user data
router.put("/update-user", authenticateToken, userController.updateUserData);

// Admin can see registration requests for new owners
router.get("/registration-requests", adminController.getOwnerRequests);

// Admin can accept or decline owner registration
router.put(
  "/registration-requests/:id/accept",
  adminController.acceptOwnerRequest
);
router.put(
  "/registration-requests/:id/decline",
  adminController.declineOwnerRequest
);

// Admin can add a new decorator
router.post("/add-decorator", adminController.addDecorator);

// Admin can add a new firm
router.post("/add-firm", adminController.addFirm);

export default router;
