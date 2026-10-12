import { prisma } from "../lib/prisma.js";
import { notFound } from "../errors/app-error.js";
import type { CreateStudentInput, ListStudentsQuery, UpdateStudentInput } from "../schemas/student.schema.js";

export async function listStudents(query: ListStudentsQuery) {
  const { page, limit, q, sort, order } = query;
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
          { code: { contains: q } },
        ],
      }
    : {};

  const [rows, total] = await Promise.all([
    prisma.student.findMany({
      where,
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.student.count({ where }),
  ]);

  return { data: rows, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getStudentById(id: string) {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) throw notFound(`ไม่พบนักศึกษา id ${id}`);
  return student;
}

export async function createStudent(input: CreateStudentInput) {
  return prisma.student.create({ data: input });
}

export async function updateStudent(id: string, input: UpdateStudentInput) {
  return prisma.student.update({ where: { id }, data: input });
}

export async function deleteStudent(id: string) {
  await prisma.student.delete({ where: { id } });
}