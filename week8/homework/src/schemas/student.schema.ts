import { z } from "zod";

const studentFields = {
  code: z
    .string({ error: "ต้องระบุรหัสนักศึกษา" })
    .trim()
    .regex(/^\d{8,10}$/, "รหัสนักศึกษาต้องเป็นตัวเลข 8–10 หลัก"),
  name: z
    .string({ error: "ต้องระบุชื่อ–นามสกุล" })
    .trim()
    .min(2, "ชื่อต้องยาวอย่างน้อย 2 ตัวอักษร")
    .max(100, "ชื่อยาวเกิน 100 ตัวอักษร"),
  email: z.email("รูปแบบอีเมลไม่ถูกต้อง"),
  score: z.coerce
    .number({ error: "คะแนนต้องเป็นตัวเลข" })
    .int("คะแนนต้องเป็นจำนวนเต็ม")
    .min(0, "คะแนนต้องไม่ต่ำกว่า 0")
    .max(100, "คะแนนต้องไม่เกิน 100"),
  active: z.boolean({ error: "active ต้องเป็น true หรือ false" }),
};

export const createStudentSchema = z.strictObject(
  {
    ...studentFields,
    score: studentFields.score.default(0),
    active: studentFields.active.default(true),
  },
  { error: "ส่งฟิลด์ที่ระบบไม่รู้จักมาด้วย — ตรวจชื่อฟิลด์ให้ตรงกับเอกสาร" },
);

export const updateStudentSchema = z
  .strictObject(studentFields, {
    error: "ส่งฟิลด์ที่ระบบไม่รู้จักมาด้วย — ตรวจชื่อฟิลด์ให้ตรงกับเอกสาร",
  })
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    error: "ต้องส่งอย่างน้อยหนึ่งฟิลด์ที่ต้องการแก้",
  });

export const studentIdParamSchema = z.strictObject({
  id: z.uuid("id ต้องเป็น UUID เช่น 3f0c1e8a-..."),
});

export const listStudentsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  q: z.string().trim().min(1).optional(),
  sort: z.enum(["code", "name", "score", "createdAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type ListStudentsQuery = z.infer<typeof listStudentsQuerySchema>;
