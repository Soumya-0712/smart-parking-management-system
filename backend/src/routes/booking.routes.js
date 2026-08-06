import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  cancelBookingController,
  checkOutController,
  checkInController,
  gateStatusController,
} from "../controllers/booking.controllers.js";

const router = Router();

router.post("/", verifyJWT, createBookingController);

router.get("/", verifyJWT, getBookingsController);

router.get("/:bookingId", verifyJWT, getBookingByIdController);

router.patch("/:bookingId/cancel", verifyJWT, cancelBookingController);

router.post("/check-in", verifyJWT, checkInController);

router.patch("/:bookingId/checkout", verifyJWT, checkOutController);

router.get("/:bookingId/gate-status", verifyJWT, gateStatusController);

export default router;
