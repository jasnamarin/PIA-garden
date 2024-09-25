import express from "express";
import * as publicDataController from "../controllers/publicDataController";

const router = express.Router();

// Guest users can fetch landing page data with no restrictions
router.get("/public-data", publicDataController.getLandingPageData);

export default router;
