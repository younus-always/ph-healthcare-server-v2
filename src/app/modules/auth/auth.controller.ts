import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import AppError from "../../errorHelpers/AppError";

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

const getMe = catchAsync(async (req: Request, res: Response) => {
      const user = req.user;
      const result = await AuthService.getMe(user);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "User profile fetched successfully",
            data: result
      });
});

const getNewToken = catchAsync(async (req: Request, res: Response) => {
      const refreshToken = req.cookies.refreshToken;
      const betterAuthSessionToken = req.cookies["better-auth.session_token"];
      if (!refreshToken) {
            throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
      }
      const result = await AuthService.getNewToken(refreshToken, betterAuthSessionToken);

      const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

      tokenUtils.setAccessTokenCookie(res, accessToken);
      tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
      tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "New tokens generated successfully",
            data: {
                  accessToken,
                  refreshToken: newRefreshToken,
                  sessionToken,
            },
      });
});


export const AuthController = {
      registerPatient,
      loginUser,
      getMe,
      getNewToken,
};