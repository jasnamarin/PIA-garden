import express from "express";
import * as firmController from "../controllers/firmController";

const router = express.Router();

// Route to get firms with search and sorting
router.get("/firms", firmController.getFirms);

export default router;
