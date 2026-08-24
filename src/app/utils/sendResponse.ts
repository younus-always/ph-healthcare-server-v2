import { Response } from "express";

interface TMeta {
      total: number;
      limit: number;
      page: number;
}

interface IResponseData<T> {
      success: boolean;
      statusCode: number;
      message: string;
      meta?: TMeta,
      data?: T,
}

export const sendResponse = <T>(res: Response, responseData: IResponseData<T>) => {
      const { success, statusCode, message, meta, data } = responseData;

      res.status(statusCode).json({
            success,
            statusCode,
            message,
            meta,
            data,
      });
};