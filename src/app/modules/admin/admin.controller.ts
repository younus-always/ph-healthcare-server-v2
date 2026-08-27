import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";


const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
      const result = await AdminService.getAllAdmins();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Admins fetched successfully",
            data: result,
      })
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const admin = await AdminService.getAdminById(id);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Admin fetched successfully",
            data: admin,
      })
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await AdminService.updateAdmin(id, req.body);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Admin updated successfully",
            data: result,
      })
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = req.user;

      const result = await AdminService.deleteAdmin(id, user);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: "Admin deleted successfully",
            data: result,
      })
});


export const AdminController = {
      getAllAdmins,
      updateAdmin,
      deleteAdmin,
      getAdminById,
};