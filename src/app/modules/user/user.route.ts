import { Router } from "express";
import { DoctorController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validation";

const router = Router();

router.post("/create-doctor",
      validateRequest(createDoctorZodSchema),
      DoctorController.createDoctor);

export const UserRoutes = router;