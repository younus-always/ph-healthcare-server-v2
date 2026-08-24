import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
      try {
            const result = await SpecialtyService.createSpecialty(req.body);

            res.status(201).json({
                  success: true,
                  statusCode: 201,
                  message: "Specialty created successfully",
                  data: result
            })
      } catch (err: any) {
            res.status(500).json({
                  success: false,
                  statusCode: 500,
                  message: "Specialty creating failed!",
                  error: err.message
            })
      }
};

const getAllSpecialties = async (req: Request, res: Response) => {
      try {
            const result = await SpecialtyService.getAllSpecialties();

            res.status(200).json({
                  success: true,
                  statusCode: 200,
                  message: "Specialties fetched successfully",
                  data: result
            })
      } catch (err: any) {
            res.status(500).json({
                  success: false,
                  statusCode: 500,
                  message: "Specialty fetched failed!",
                  error: err.message
            })
      }
};

const deleteSpecialty = async (req: Request, res: Response) => {
      try {
            const id = req.params.id as string;
            const result = await SpecialtyService.deleteSpecialty(id);

            res.status(200).json({
                  success: true,
                  statusCode: 200,
                  message: "Specialty deleted successfully",
                  data: result
            })
      } catch (err: any) {
            res.status(500).json({
                  success: false,
                  statusCode: 500,
                  message: "Specialty deleted failed!",
                  error: err.message
            })
      }
};

const updateSpecialty = async (req: Request, res: Response) => {
      try {
            const id = req.params.id as string;

            const result = await SpecialtyService.updateSpecialty(id, req.body);

            res.status(200).json({
                  success: true,
                  statusCode: 200,
                  message: "Specialty updated successfully",
                  data: result
            })
      } catch (err: any) {
            res.status(500).json({
                  success: false,
                  statusCode: 500,
                  message: "Specialty updated failed!",
                  error: err.message
            })
      }
};


export const SpecialtyController = {
      createSpecialty,
      getAllSpecialties,
      deleteSpecialty,
      updateSpecialty,
}