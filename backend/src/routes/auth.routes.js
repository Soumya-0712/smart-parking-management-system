import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  registerController,
  loginController,
  getCurrentUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/me", verifyJWT, getCurrentUser);

export default router;
