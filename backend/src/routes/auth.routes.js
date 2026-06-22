import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  registerController,
  loginController,
  getCurrentUser,
  logoutController,
} from "../controllers/auth.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { USER_ROLES } from "../constants/roles.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/me", verifyJWT, getCurrentUser);

router.post("/logout", verifyJWT, logoutController);

export default router;
