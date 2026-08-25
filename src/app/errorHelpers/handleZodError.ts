import status from "http-status";
import { ZodError } from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { envVars } from "../config/env";

export const handleZodError = (err: ZodError): TErrorResponse => {
      const statusCode = status.BAD_REQUEST;
      const message = "Zod validation error";
      const errorSources: TErrorSources[] = [];

      err.issues.forEach((issue) => {
            errorSources.push({
                  path: issue.path.join(" => ") || "Unknown",
                  message: issue.message,
            })
      });

      return {
            success: false,
            statusCode,
            message,
            errorSources,
            error: envVars.NODE_ENV === "development" ? err : undefined
      }
};