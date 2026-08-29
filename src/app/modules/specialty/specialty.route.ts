import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { createSpecialtyZodSchema } from "./specialty.validation";

const router = Router();

router.get("/",
      SpecialtyController.getAllSpecialties
);
router.post("/",
      multerUpload.single("file"),
      validateRequest(createSpecialtyZodSchema),
      SpecialtyController.createSpecialty
);
router.delete("/:id",
      checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
      SpecialtyController.deleteSpecialty
);

export const SpecialtyRoutes = router;