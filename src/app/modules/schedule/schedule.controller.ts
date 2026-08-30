import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ScheduleService } from "./schedule.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";


const createSchedule = catchAsync(async (req: Request, res: Response) => {
      const schedule = await ScheduleService.createSchedule(req.body);

      sendResponse(res, {
            success: true,
            statusCode: status.CREATED,
            message: 'Schedule created successfully',
            data: schedule
      });
});

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
      const result = await ScheduleService.getAllSchedules();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Schedules retrieved successfully',
            data: result
      });
});

const getScheduleById = catchAsync(async (req: Request, res: Response) => {
      const result = await ScheduleService.getScheduleById();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Schedule retrieved successfully',
            data: result
      });
});

const updateSchedule = catchAsync(async (req: Request, res: Response) => {
      const result = await ScheduleService.updateSchedule();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Schedule updated successfully',
            data: result
      });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
      const result = await ScheduleService.deleteSchedule();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Schedule deleted successfully',
            data: result
      });
});


export const ScheduleController = {
      createSchedule,
      getAllSchedules,
      getScheduleById,
      updateSchedule,
      deleteSchedule
};