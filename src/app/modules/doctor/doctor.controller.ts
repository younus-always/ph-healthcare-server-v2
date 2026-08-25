import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
      const result = await DoctorService.getAllDoctors();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Doctors fetched successfully",
            data: result
      })
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await DoctorService.getDoctorById(id);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Doctor fetched successfully",
            data: result
      })
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await DoctorService.deleteDoctor(id);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Doctor deleted successfully",
            data: result
      })
});


export const DoctorController = {
      getAllDoctors,
      getDoctorById,
      deleteDoctor
};