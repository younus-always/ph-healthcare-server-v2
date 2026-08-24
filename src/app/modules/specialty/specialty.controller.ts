import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
      const result = await SpecialtyService.createSpecialty(req.body);

      sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Specialty created successfully",
            data: result
      });
});

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
      const result = await SpecialtyService.getAllSpecialties();

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Specialties fetched successfully",
            data: result
      });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await SpecialtyService.deleteSpecialty(id);

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Specialty deleted successfully",
            data: result
      });
});

const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await SpecialtyService.updateSpecialty(id, req.body);

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Specialty updated successfully",
            data: result
      })

});


export const SpecialtyController = {
      createSpecialty,
      getAllSpecialties,
      deleteSpecialty,
      updateSpecialty,
}