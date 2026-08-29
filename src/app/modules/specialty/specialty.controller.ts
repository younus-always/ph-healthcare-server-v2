import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
      const payload = {
            ...req.body,
            icon: req.file?.path
      };
      const result = await SpecialtyService.createSpecialty(payload);

      sendResponse(res, {
            success: true,
            statusCode: status.CREATED,
            message: "Specialty created successfully",
            data: result
      });
});

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
      const result = await SpecialtyService.getAllSpecialties();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Specialties fetched successfully",
            data: result
      });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await SpecialtyService.deleteSpecialty(id);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Specialty deleted successfully",
            data: result
      });
});


export const SpecialtyController = {
      createSpecialty,
      getAllSpecialties,
      deleteSpecialty,
}