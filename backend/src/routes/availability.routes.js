import { Router } from "express";

import { getAvailableParkingController } from "../controllers/availability.controllers.js";

const router = Router();

router.get("/", getAvailableParkingController);

export default router;
