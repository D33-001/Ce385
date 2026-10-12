import { Router } from "express";
import { asyncHandler } from "../middlewares/async-handler.js";
import { validate } from "../middlewares/validate.js";
import {
  createStudentSchema,
  listStudentsQuerySchema,
  studentIdParamSchema,
  updateStudentSchema,
  type CreateStudentInput,
  type ListStudentsQuery,
  type UpdateStudentInput,
} from "../schemas/student.schema.js";
import * as studentService from "../services/student.service.js";

export const studentsRouter = Router();

studentsRouter.get(
  "/",
  validate({ query: listStudentsQuerySchema }),
  asyncHandler(async (_req, res) => {
    const query: ListStudentsQuery = res.locals.valid.query;
    const result = await studentService.listStudents(query);
    res.status(200).json(result);
  }),
);

studentsRouter.get(
  "/:id",
  validate({ params: studentIdParamSchema }),
  asyncHandler(async (_req, res) => {
    const { id } = res.locals.valid.params as { id: string };
    const student = await studentService.getStudentById(id);
    res.status(200).json({ data: student });
  }),
);

studentsRouter.post(
  "/",
  validate({ body: createStudentSchema }),
  asyncHandler(async (_req, res) => {
    const input: CreateStudentInput = res.locals.valid.body;
    const created = await studentService.createStudent(input);
    res
      .status(201)
      .location(`/api/v1/students/${created.id}`)
      .json({ data: created });
  }),
);

studentsRouter.patch(
  "/:id",
  validate({ params: studentIdParamSchema, body: updateStudentSchema }),
  asyncHandler(async (_req, res) => {
    const { id } = res.locals.valid.params as { id: string };
    const input: UpdateStudentInput = res.locals.valid.body;
    const updated = await studentService.updateStudent(id, input);
    res.status(200).json({ data: updated });
  }),
);

studentsRouter.delete(
  "/:id",
  validate({ params: studentIdParamSchema }),
  asyncHandler(async (_req, res) => {
    const { id } = res.locals.valid.params as { id: string };
    await studentService.deleteStudent(id);
    res.status(204).end();
  }),
);
