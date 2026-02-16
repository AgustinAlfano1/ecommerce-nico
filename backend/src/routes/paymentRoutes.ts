import { Router } from "express";
import { createPreference } from "../controllers/paymentController";

const router = Router();

router.post("/create-preference", createPreference);

export default router;
