import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ScheduleService } from "./schedule.service";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query.interface";


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
      const query = req.query;
      const result = await ScheduleService.getAllSchedules(query as IQueryParams);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Schedules retrieved successfully',
            data: result.data,
            meta: result.meta
      });
});

const getScheduleById = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await ScheduleService.getScheduleById(id);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Schedule retrieved successfully',
            data: result
      });
});

const updateSchedule = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const payload = req.body;
      const result = await ScheduleService.updateSchedule(id, payload);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Schedule updated successfully',
            data: result
      });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await ScheduleService.deleteSchedule(id);

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Schedule deleted successfully',
      });
});


export const ScheduleController = {
      createSchedule,
      getAllSchedules,
      getScheduleById,
      updateSchedule,
      deleteSchedule
};