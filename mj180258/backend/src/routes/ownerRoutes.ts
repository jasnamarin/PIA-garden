import express from "express";
import * as ownerController from "../controllers/ownerController";

const router = express.Router();

// Anyone can request owner registration
router.post("/register-owner", ownerController.registerOwner);

export default router;
