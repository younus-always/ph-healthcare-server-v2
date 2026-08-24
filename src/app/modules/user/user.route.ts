import { Router } from "express";
import { DoctorController } from "./user.controller";

const router = Router();

router.post("/create-doctor", DoctorController.createDoctor);

export const UserRoutes = router;