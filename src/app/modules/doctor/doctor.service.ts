import { prisma } from "../../lib/prisma"

const getAllDoctors = async () => {
      const doctors = await prisma.doctor.findMany({
            include: {
                  user: true,
                  specialties: {
                        include: {
                              specialty: true
                        }
                  }
            }
      });
      return doctors;
};

const getDoctorById = async (id: string) => {
       const isDoctorExist = await prisma.doctor.findUnique({
            where: { id }
      });

      if (!isDoctorExist) {
            throw new Error("Doctor not found!")
      };
      
      const doctor = await prisma.doctor.findUnique({
            where: { id }
      });
      return doctor;
};

const deleteDoctor = async (id: string) => {
      const isDoctorExist = await prisma.doctor.findUnique({
            where: { id }
      });

      if (!isDoctorExist) {
            throw new Error("Doctor not found!")
      };

      const doctor = await prisma.doctor.delete({
            where: { id }
      });
      return doctor;
};

export const DoctorService = {
      getAllDoctors,
      getDoctorById,
      deleteDoctor
};