import express from "express";
import { subscribeNewsletter } from "../controllers/newsletter.controller.js";
import sanitizeInput from "../middleware/sanitizeInput.js";

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);

export default router;
