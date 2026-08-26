import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import status from "http-status";
import { tokenUtils } from "../../utils/token";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
      const result = await AuthService.registerPatient(req.body);
      const { token, accessToken, refreshToken, ...rest } = result;

      tokenUtils.setAccessTokenCookie(res, accessToken);
      tokenUtils.setRefreshTokenCookie(res, refreshToken);
      tokenUtils.setBetterAuthSessionCookie(res, token as string);

      sendResponse(res, {
            success: true,
            statusCode: status.CREATED,
            message: "Patient registered successfully",
            data: {
                  token,
                  accessToken,
                  refreshToken,
                  ...rest
            }
      });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
      const result = await AuthService.loginUser(req.body);
      const { token, accessToken, refreshToken, ...rest } = result;

      tokenUtils.setAccessTokenCookie(res, accessToken);
      tokenUtils.setRefreshTokenCookie(res, refreshToken);
      tokenUtils.setBetterAuthSessionCookie(res, token);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "User logged in successfully",
            data: {
                  token,
                  accessToken,
                  refreshToken,
                  ...rest
            }
      });
});


export const AuthController = {
      registerPatient,
      loginUser,
};