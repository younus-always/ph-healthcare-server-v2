import { uuidv7 } from "zod";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { prisma } from "../../lib/prisma";
import { IBookAppointmentPayload } from "./appointment.interface";
import { AppointmentStatus, Role } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import status from "http-status";

const bookAppointment = async (user: IRequestUser, payload: IBookAppointmentPayload) => {
      const patientData = await prisma.patient.findUniqueOrThrow({
            where: {
                  email: user.email,
            }
      });

      const doctorData = await prisma.doctor.findUniqueOrThrow({
            where: {
                  id: payload.doctorId,
                  isDeleted: false,
            }
      });

      const scheduleData = await prisma.schedule.findUniqueOrThrow({
            where: {
                  id: payload.scheduleId,
            }
      });

      const doctorSchedule = await prisma.doctorSchedules.findUniqueOrThrow({
            where: {
                  doctorId_scheduleId: {
                        doctorId: doctorData.id,
                        scheduleId: scheduleData.id,
                  }
            }
      });

      const videoCallingId = String(uuidv7());

      const result = await prisma.$transaction(async (tx) => {
            const appointmentData = await tx.appointment.create({
                  data: {
                        doctorId: payload.doctorId,
                        patientId: patientData.id,
                        scheduleId: doctorSchedule.scheduleId,
                        videoCallingId,
                  }
            });

            await tx.doctorSchedules.update({
                  where: {
                        doctorId_scheduleId: {
                              doctorId: payload.doctorId,
                              scheduleId: payload.scheduleId,
                        }
                  },
                  data: {
                        isBooked: true,
                  }
            });

            //TODO : Payment Integration will be here

            return appointmentData;
      });
      return result;
};

const getMyAppointments = async (user: IRequestUser) => {
      //user can be patient or doctor, so we need to check both
      const patientData = await prisma.patient.findUnique({
            where: {
                  email: user?.email
            }
      });

      const doctorData = await prisma.doctor.findUnique({
            where: {
                  email: user?.email
            }
      });

      let appointments = [];

      if (patientData) {
            appointments = await prisma.appointment.findMany({
                  where: {
                        patientId: patientData.id
                  },
                  include: {
                        doctor: true,
                        schedule: true
                  }
            });
      } else if (doctorData) {
            appointments = await prisma.appointment.findMany({
                  where: {
                        doctorId: doctorData.id
                  },
                  include: {
                        patient: true,
                        schedule: true
                  }
            });
      } else {
            throw new Error("User not found");
      }

      return appointments;
};

// 1. Completed Or Cancelled Appointments should not be allowed to update status
// 2. Doctors can only update Appointment status from schedule to inprogress or inprogress to completed or schedule to cancelled.
// 3. Patients can only cancel the scheduled appointment if it scheduled not completed or cancelled or inprogress. 
// 4. Admin and Super admin can update to any status.

const changeAppointmentStatus = async (appointmentId: string, appointmentStatus: AppointmentStatus, user: IRequestUser) => {
      const appointmentData = await prisma.appointment.findUniqueOrThrow({
            where: {
                  id: appointmentId,
            },
            include: {
                  doctor: true
            }
      });

      if (user?.role === Role.DOCTOR) {
            if (!(user?.email === appointmentData.doctor.email))
                  throw new AppError(status.BAD_REQUEST, "This is not your appointment")
      };

      return await prisma.appointment.update({
            where: {
                  id: appointmentId
            },
            data: {
                  status: appointmentStatus
            }
      });
};

// refactoring on include of doctor and patient data in appointment details, we can use query builder to get the data in single query instead of multiple queries in case of doctor and patient both.
const getMySingleAppointment = async (appointmentId: string, user: IRequestUser) => {
      const patientData = await prisma.patient.findUnique({
            where: {
                  email: user?.email
            }
      });

      const doctorData = await prisma.doctor.findUnique({
            where: {
                  email: user?.email
            }
      });

      let appointment;

      if (patientData) {
            appointment = await prisma.appointment.findFirst({
                  where: {
                        id: appointmentId,
                        patientId: patientData.id
                  },
                  include: {
                        doctor: true,
                        schedule: true
                  }
            });
      } else if (doctorData) {
            appointment = await prisma.appointment.findFirst({
                  where: {
                        id: appointmentId,
                        doctorId: doctorData.id
                  },
                  include: {
                        patient: true,
                        schedule: true
                  }
            });
      };

      if (!appointment) {
            throw new AppError(status.NOT_FOUND, "Appointment not found");
      };

      return appointment;
};

//TODO: integrate query builder
const getAllAppointments = async () => {
      const appointments = await prisma.appointment.findMany({
            include: {
                  doctor: true,
                  patient: true,
                  schedule: true
            }
      });
      return appointments;
};

const bookAppointmentWithPayLater = async () => { };

const initiatePayment = async () => { };


export const AppointmentService = {
      bookAppointment,
      getMyAppointments,
      changeAppointmentStatus,
      getMySingleAppointment,
      getAllAppointments,
      bookAppointmentWithPayLater,
      initiatePayment,
};