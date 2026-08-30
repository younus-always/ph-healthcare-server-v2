import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import status from "http-status";
import { AppointmentService } from "./appointment.service";

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
      const user = req.user;
      const appointment = await AppointmentService.bookAppointment(user, req.body);

      sendResponse(res, {
            success: true,
            statusCode: status.CREATED,
            message: 'Appointment booked successfully',
            data: appointment
      });
});

const getMyAppointments = catchAsync(async (req: Request, res: Response) => {
      const appointments = await AppointmentService.getMyAppointments();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Appointments retrieved successfully',
            data: appointments
      });
});

const changeAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
      const updatedAppointment = await AppointmentService.changeAppointmentStatus();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Appointment status updated successfully',
            data: updatedAppointment
      });
});

const getMySingleAppointment = catchAsync(async (req: Request, res: Response) => {
      const appointment = await AppointmentService.getMySingleAppointment();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Appointment retrieved successfully',
            data: appointment
      });
});

const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
      const appointments = await AppointmentService.getAllAppointments();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'All appointments retrieved successfully',
            data: appointments
      });
});

const bookAppointmentWithPayLater = catchAsync(async (req: Request, res: Response) => {
      const appointment = await AppointmentService.bookAppointmentWithPayLater();

      sendResponse(res, {
            success: true,
            statusCode: status.CREATED,
            message: 'Appointment booked successfully with Pay Later option',
            data: appointment
      });
});

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
      const paymentInfo = await AppointmentService.initiatePayment();

      sendResponse(res, {
            success: true,
            statusCode: status.OK,
            message: 'Payment initiated successfully',
            data: paymentInfo
      });
});

export const AppointmentController = {
      bookAppointment,
      getMyAppointments,
      changeAppointmentStatus,
      getMySingleAppointment,
      getAllAppointments,
      bookAppointmentWithPayLater,
      initiatePayment,
};