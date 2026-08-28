import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/me",
      checkAuth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
      AuthController.getMe
);
router.post("/register", AuthController.registerPatient);
router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.getNewToken);
router.post("/change-password", AuthController.changePassword);
router.post("/logout",
      checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR, Role.PATIENT),
      AuthController.logoutUser
);

export const AuthRoutes = router;