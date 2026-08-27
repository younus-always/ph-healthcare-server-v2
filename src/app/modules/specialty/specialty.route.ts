import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/",
      SpecialtyController.getAllSpecialties
);
router.post("/",
      checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
      SpecialtyController.createSpecialty
);
router.delete("/:id",
      checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
      SpecialtyController.deleteSpecialty
);
router.patch("/:id",
      checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
      SpecialtyController.updateSpecialty
);

export const SpecialtyRoutes = router;