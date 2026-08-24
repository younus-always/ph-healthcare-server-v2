import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
      const result = await AuthService.registerPatient(req.body);

      sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Patient registered successfully",
            data: result
      });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
      const result = await AuthService.loginUser(req.body);

      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            data: result
      });
});


export const AuthController = {
      registerPatient,
      loginUser,
};