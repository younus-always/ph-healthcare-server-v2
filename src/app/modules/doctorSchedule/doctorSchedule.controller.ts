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
            meta: result.meta,
            data: result.data
      });
});

const getAllDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
      const query = req.query as IQueryParams;
      const result = await DoctorScheduleService.getAllDoctorSchedules(query);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'All doctor schedules retrieved successfully',
            meta: result.meta,
            data: result.data
      });
});

const getDoctorScheduleById = catchAsync(async (req: Request, res: Response) => {
      const doctorId = req.params.doctorId as string;
      const scheduleId = req.params.scheduleId as string;
      const doctorSchedule = await DoctorScheduleService.getDoctorScheduleById(doctorId, scheduleId);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Doctor schedule retrieved successfully',
            data: doctorSchedule
      });
});

const updateMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
      const user = req.user;
      const updatedDoctorSchedule = await DoctorScheduleService.updateMyDoctorSchedule(user, req.body);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Doctor schedule updated successfully',
            data: updatedDoctorSchedule
      });
});

const deleteMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = req.user;
      await DoctorScheduleService.deleteMyDoctorSchedule(id, user);

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