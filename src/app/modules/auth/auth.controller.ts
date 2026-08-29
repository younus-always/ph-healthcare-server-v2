import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import AppError from "../../errorHelpers/AppError";
import { cookieUtils } from "../../utils/cookie";
import { envVars } from "../../config/env";
import { auth } from "../../lib/auth";

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

const changePassword = catchAsync(async (req: Request, res: Response) => {
      const betterAuthSessionToken = req.cookies["better-auth.session_token"];
      const result = await AuthService.changePassword(req.body, betterAuthSessionToken);

      const { accessToken, refreshToken, token } = result;

      tokenUtils.setAccessTokenCookie(res, accessToken);
      tokenUtils.setRefreshTokenCookie(res, refreshToken);
      tokenUtils.setBetterAuthSessionCookie(res, token as string);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Password changed successfully",
            data: result
      });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
      const betterAuthSessionToken = req.cookies["better-auth.session_token"];
      const result = await AuthService.logoutUser(betterAuthSessionToken);

      cookieUtils.clearCookie(res, 'accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
      });
      cookieUtils.clearCookie(res, 'refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
      });
      cookieUtils.clearCookie(res, 'better-auth.session_token', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
      });

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "User logged out successfully",
            data: result,
      });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
      const { email, otp } = req.body;
      await AuthService.verifyEmail(email, otp);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Email verified successfully",
      });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
      const { email } = req.body;
      await AuthService.forgetPassword(email);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Password reset OTP sent to email successfully",
      });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
      const { email, otp, newPassword } = req.body;
      await AuthService.resetPassword(email, otp, newPassword);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Password reset successfully",
      });
});

// /api/v1/auth/login/google?redirect=/profile
const googleLogin = catchAsync(async (req: Request, res: Response) => {
      const redirectPath = req.query.redirect || "/dashboard";
      const encodedRedirectPath = encodeURIComponent(redirectPath as string);

      const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;

      res.render("googleRedirect", {
            callbackURL: callbackURL,
            betterAuthUrl: envVars.BETTER_AUTH_URL,
      });
});

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
      const redirectPath = req.query.redirect as string || "/dashboard";
      const sessionToken = req.cookies["better-auth.session_token"];

      if (!sessionToken) {
            return res.redirect(`${envVars.FRONTEND_URL}/login?error=oauth_failed`);
      };

      const session = await auth.api.getSession({
            headers: {
                  "Cookie": `better-auth.session_token=${sessionToken}`
            }
      });

      if (!session) {
            return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_session_found`);
      };

      if (session && !session.user) {
            return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
      };

      const result = await AuthService.googleLoginSuccess(session);
      const { accessToken, refreshToken } = result;

      tokenUtils.setAccessTokenCookie(res, accessToken);
      tokenUtils.setRefreshTokenCookie(res, refreshToken);

      //* ?redirect=//profile -> /profile
      const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
      const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";

      res.redirect(`${envVars.FRONTEND_URL}${finalRedirectPath}`);
});

const handleOAuthError = catchAsync(async (req: Request, res: Response) => {
      const error = req.query.error as string || "oauth_failed";
      res.redirect(`${envVars.FRONTEND_URL}/login?error=${error}`);
});


export const AuthController = {
      registerPatient,
      loginUser,
      getMe,
      getNewToken,
      changePassword,
      logoutUser,
      verifyEmail,
      forgetPassword,
      resetPassword,
      googleLogin,
      googleLoginSuccess,
      handleOAuthError
};