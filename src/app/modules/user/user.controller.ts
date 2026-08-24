import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";
import { DoctorService } from "./user.service";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
      const result = await DoctorService.createDoctor(req.body);

      sendResponse(res, {
            success: true,
            statusCode: status.CREATED,
            message: "Doctor registered successfully",
            data: result
      })
});


export const DoctorController = {
      createDoctor,
}