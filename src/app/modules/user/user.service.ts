import { Role, Specialty } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: ICreateDoctorPayload) => {
      const specialties: Specialty[] = []

      for (const specialtyId of payload.specialties) {
            const specialty = await prisma.specialty.findUnique({
                  where: {
                        id: specialtyId
                  }
            });

            if (!specialty) {
                  throw new Error(`Specialty with id ${specialtyId} not found!`)
            };
            specialties.push(specialty)
      };

      const userExist = await prisma.user.findUnique({
            where: {
                  email: payload.doctor.email
            }
      });

      if (userExist) {
            throw new Error("User with this email already exists.")
      };

      const userData = await auth.api.signUpEmail({
            body: {
                  name: payload.doctor.name,
                  email: payload.doctor.email,
                  password: payload.password,
                  role: Role.DOCTOR,
                  needPasswordChange: true,
            }
      });

      try {
            const result = await prisma.$transaction(async (tx) => {
                  const doctorData = await tx.doctor.create({
                        data: {
                              userId: userData.user.id,
                              ...payload.doctor,
                              experience: payload.doctor.experience
                                    ? Number(payload.doctor.experience)
                                    : undefined,
                        }
                  });

                  const doctorSpecialtyData = specialties.map((specialty) => {
                        return {
                              doctorId: doctorData.id,
                              specialtyId: specialty.id,
                        }
                  });

                  await tx.doctorSpecialty.createMany({
                        data: doctorSpecialtyData
                  });

                  const doctor = await tx.doctor.findUnique({
                        where: {
                              id: doctorData.id
                        },
                        select: {
                              id: true,
                              userId: true,
                              name: true,
                              email: true,
                              profilePhoto: true,
                              contactNumber: true,
                              address: true,
                              experience: true,
                              registrationNumber: true,
                              gender: true,
                              appointmentFee: true,
                              qualification: true,
                              currentWorkingPlace: true,
                              designation: true,
                              createdAt: true,
                              updatedAt: true,
                              user: {
                                    select: {
                                          id: true,
                                          name: true,
                                          email: true,
                                          emailVerified: true,
                                          image: true,
                                          role: true,
                                          status: true,
                                          isDeleted: true,
                                          deletedAt: true,
                                          createdAt: true,
                                          updatedAt: true,
                                    }
                              },
                              specialties: {
                                    select: {
                                          specialty: {
                                                select: {
                                                      id: true,
                                                      title: true
                                                }
                                          }
                                    }
                              }
                        }
                  });

                  return doctor;
            });

            return result;
      } catch (error) {
            console.log("Transaction Error:", error);
            await prisma.user.delete({
                  where: {
                        id: userData.user.id
                  }
            });
            throw error;
      }
};


export const DoctorService = {
      createDoctor,
};