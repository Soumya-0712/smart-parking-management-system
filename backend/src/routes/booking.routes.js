import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import { createBookingController } from "../controllers/booking.controllers.js";

const router = Router();

router.post("/", verifyJWT, createBookingController);

export default router;
