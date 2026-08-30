import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { IQueryParams } from "../../interfaces/query.interface";


const createMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
      const user = req.user;
      const payload = req.body;
      const doctorSchedule = await DoctorScheduleService.createMyDoctorSchedule(user, payload);

      sendResponse(res, {
            success: true,
            statusCode: status.CREATED,
            message: 'Doctor schedule created successfully',
            data: doctorSchedule
      });
});

const getMyDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
      const user = req.user;
      const query = req.query as IQueryParams;
      const result = await DoctorScheduleService.getMyDoctorSchedules(user, query);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Doctor schedules retrieved successfully',
            data: result
      });
});

const getAllDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
      const result = await DoctorScheduleService.getAllDoctorSchedules();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'All doctor schedules retrieved successfully',
            data: result
      });
});

const getDoctorScheduleById = catchAsync(async (req: Request, res: Response) => {
      const doctorSchedule = await DoctorScheduleService.getDoctorScheduleById();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Doctor schedule retrieved successfully',
            data: doctorSchedule
      });
});

const updateMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
      const updatedDoctorSchedule = await DoctorScheduleService.updateMyDoctorSchedule();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Doctor schedule updated successfully',
            data: updatedDoctorSchedule
      });
});

const deleteMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
      await DoctorScheduleService.deleteMyDoctorSchedule();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Doctor schedule deleted successfully',
      });
});


export const DoctorScheduleController = {
      createMyDoctorSchedule,
      getMyDoctorSchedules,
      getAllDoctorSchedules,
      getDoctorScheduleById,
      updateMyDoctorSchedule,
      deleteMyDoctorSchedule
};