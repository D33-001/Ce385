# README — คำอธิบายไฟล์ตัวอย่าง JavaScript (Functions, Collections, Transform)

---

## ไฟล์ที่ 1: `ex1-functions.js` — คำนวณคะแนนและตัดเกรด

**จุดประสงค์หลัก:** สาธิตการเขียนฟังก์ชันพื้นฐาน (arrow function, function ปกติ, default parameters) พร้อมตรรกะการตัดเกรดแบบ data-driven

### ค่าคงที่ (Constants)
- `MIN_SCORE`, `MAX_SCORE` (0–100): ขอบเขตคะแนนที่ยอมรับได้
- `DEFAULT_WORKSHOP_FULL = 60`, `DEFAULT_WORKSHOP_WEIGHT = 20`: ค่าเริ่มต้นสำหรับแปลงคะแนน Workshop
- `GRADE_RULES`: Array ของ Object เก็บ "กฎการตัดเกรด" เรียงจากคะแนนมากไปน้อย (80→A, 75→B+, ..., 0→F) ทำให้เพิ่ม/แก้เกณฑ์เกรดได้ง่ายโดยไม่ต้องแก้โค้ดฟังก์ชัน

### ฟังก์ชันคำนวณ
1. **`isValidScore(score)`** — ตรวจสอบว่าค่าที่ส่งเข้ามาเป็นตัวเลข และอยู่ในช่วง 0–100 หรือไม่ (ใช้หลักการ "ห้ามเชื่อข้อมูลจาก Client โดยไม่ตรวจสอบก่อน")
2. **`toGrade(score)`** — แปลงคะแนนเป็นเกรด โดยเรียก `isValidScore` ตรวจก่อนเสมอ ถ้าไม่ผ่านจะคืนค่า `'Invalid Data'` ถ้าผ่านจะใช้ `.find()` ไล่หากฎข้อแรกใน `GRADE_RULES` ที่คะแนน >= เกณฑ์ขั้นต่ำ
3. **`calculateWorkshopScore(raw, full, weight)`** — แปลงคะแนนดิบของ Workshop เป็นคะแนนตามสัดส่วนน้ำหนักที่กำหนด (สูตร `(raw/full) * weight`) มี **default parameters** คือถ้าไม่ส่ง `full`/`weight` มา จะใช้ 60 และ 20 โดยอัตโนมัติ
4. **`calculateTotal(workshop, attendance, project, midterm, final)`** — ฟังก์ชันแบบปกติ (function declaration ไม่ใช่ arrow) รวมคะแนนทุกส่วนเป็นคะแนนรวม

### ทดสอบกับข้อมูลนักศึกษา 3 คน
- มีนักศึกษา 3 คน คนที่ 3 (`003`) ตั้งใจใส่ `rawWs: -5` (ค่าติดลบ) เพื่อทดสอบว่าระบบจัดการค่าผิดปกติได้
- ใช้ `.map()` วนคำนวณคะแนนรวมและเกรดของแต่ละคน แล้วแสดงผลด้วย `console.table()` เป็นตาราง

### พิสูจน์การทำงานของ Default Parameters
- เปรียบเทียบผลลัพธ์การเรียกฟังก์ชันแบบไม่ส่งค่า (`calculateWorkshopScore(48)`) กับแบบส่งค่าครบ (`calculateWorkshopScore(48, 60, 20)`) ว่าได้ผลลัพธ์เท่ากันหรือไม่ (ต้องเป็น `true`)
- ทดสอบกรณีส่ง `undefined` แทนพารามิเตอร์ตัวกลาง (`full`) เพื่อพิสูจน์ว่า JavaScript จะใช้ค่า default แทนอัตโนมัติเมื่อพารามิเตอร์เป็น `undefined`

---

## ไฟล์ที่ 2: `ex2-collection.js` — ค้นหาและเข้าถึงข้อมูลอย่างปลอดภัย

**จุดประสงค์หลัก:** สาธิตการใช้ array methods สำหรับ "ค้นหา/กรอง/ตรวจสอบเงื่อนไข" และการเข้าถึงข้อมูลที่อาจไม่มีอยู่จริงโดยไม่ทำให้โปรแกรมพัง

### ข้อมูลตั้งต้น
- Array `students` เก็บนักศึกษา 6 คน แต่ละคนมี object ย่อย `contact` (email, phone) ซ้อนอยู่ข้างใน
- ตั้งใจใส่ข้อมูลไม่สมบูรณ์ไว้ทดสอบ เช่น คนที่ `004` ไม่มีเบอร์โทร (`phone: ""`) และคนที่ `006` ไม่มีอีเมล (`email: ""`)
- ประกาศด้วย `const` เพื่อป้องกันการเผลอเขียนทับตัวแปรทั้งก้อนโดยไม่ได้ตั้งใจ (แต่ยังแก้ไขค่าภายใน object/array ได้ตามปกติ)

### ฟังก์ชันค้นหา (Pure Functions)
1. **`findById(studentsArray, id)`** — ใช้ `.find()` คืนค่านักศึกษาคนแรกที่ id ตรงกัน ถ้าไม่เจอจะคืน `undefined` (ไม่ error)
2. **`findByMajor(studentsArray, major)`** — ใช้ `.filter()` คืน Array ของนักศึกษาทุกคนที่เรียนสาขานั้นๆ
3. **`hasFailingStudent(studentsArray)`** — ใช้ `.some()` ตรวจว่ามีนักศึกษาคนใดคะแนนต่ำกว่า 50 หรือไม่ คืนค่า `true`/`false`
4. **`getEmail(studentsArray, id)`** — เรียกใช้ `findById` ซ้ำ (code reuse) แล้วดึงอีเมลออกมาอย่างปลอดภัยด้วย
   - `?.` (Optional Chaining) — ถ้า `student` หรือ `contact` เป็น `undefined` จะไม่เกิด error แต่คืนค่า `undefined` แทน
   - `??` (Nullish Coalescing) — ถ้าผลลัพธ์เป็น `null`/`undefined` จะคืนข้อความ `"ไม่พบข้อมูลติดต่อ"` แทน

ทุกฟังก์ชันในส่วนนี้เป็น **Pure Function** คือรับ Array เข้ามาเป็นพารามิเตอร์แล้วคืนค่าใหม่ ไม่ไปแก้ไข Array เดิม

### ทดสอบการทำงาน
- ทดสอบ `findByMajor`, `hasFailingStudent` กับข้อมูลจริง
- ทดสอบกรณี "หาไม่เจอ" โดยค้นหา id `"9999"` ที่ไม่มีอยู่จริง เพื่อพิสูจน์ว่า `findById` และ `getEmail` จัดการกรณีนี้ได้โดยไม่ทำให้โปรแกรม crash
- ทดสอบ **Immutability**: สร้างนักศึกษาใหม่ (`newStudent`) ที่ไม่มี property `contact` เลย แล้วใช้ **Spread Operator** (`...students`) สร้าง Array ใหม่ (`updatedStudents`) แทนการ `push()` ทับของเดิม จากนั้นเรียก `getEmail` กับคนใหม่นี้เพื่อพิสูจน์ว่า Optional Chaining ป้องกัน error ได้แม้ไม่มี `contact` เลยก็ตาม

---

## ไฟล์ที่ 3: `ex3-transform.js` — แปลงและสรุปข้อมูลเป็นรายงาน

**จุดประสงค์หลัก:** สาธิตการ "แปลงรูปข้อมูล" (transform) ด้วย `map` / `filter` / `reduce` ล้วนๆ โดยห้ามใช้ลูป `for`/`while` เลย พร้อมทดสอบกรณีขอบ (edge case) อย่างละเอียด

### ข้อมูลและฟังก์ชันช่วยเหลือ
- Array `students` มี 6 คน แต่ตั้งใจใส่ข้อมูลไม่สมบูรณ์ เช่น `major: ""`, `id: ""`, `name: ""` เพื่อทดสอบว่าฟังก์ชันด้านล่างยังทำงานได้แม้ข้อมูลไม่ครบ
- **`toGrade(score)`** — ฟังก์ชันช่วยตัดเกรด เขียนแบบ Pure Function ด้วย if-return ต่อกันเป็นลำดับ (ต่างจากไฟล์ที่ 1 ที่ใช้ Array + `.find()` — เป็นอีกวิธีหนึ่งในการทำสิ่งเดียวกัน)

### ฟังก์ชันแปลงข้อมูล (ห้ามใช้ for/while)
1. **`getNames(studentsArray)`** — ใช้ `.map()` ดึงเฉพาะชื่อออกมาเป็น Array ของ String
2. **`getPassedStudents(studentsArray)`** — ใช้ `.filter()` คัดเฉพาะคนที่คะแนน >= 50
3. **`getTotalScore(studentsArray)`** — ใช้ `.reduce()` บวกคะแนนทุกคนรวมกัน โดยเริ่มต้นที่ 0
4. **`getAverageScore(studentsArray)`** — คำนวณคะแนนเฉลี่ย มี **Guard Clause** ตรวจก่อนว่าถ้า Array ว่าง (`length === 0`) ให้คืน 0 ทันที (ป้องกันหารด้วยศูนย์ที่จะได้ `NaN`) ใช้ `.toFixed(2)` ปัดทศนิยม 2 ตำแหน่งแล้วแปลงกลับเป็นตัวเลขด้วย `Number()`
5. **`countByGrade(studentsArray)`** — ใช้ `.reduce()` สร้าง Object สรุปว่าแต่ละเกรดมีกี่คน (เช่น `{A: 2, B: 1, F: 3}`) โดยเริ่มจาก Object ว่าง `{}`
6. **`getTopStudent(studentsArray)`** — ใช้ `.reduce()` หาคนที่คะแนนสูงสุด โดยตั้งค่าเริ่มต้นเป็นคนแรกของ Array (`studentsArray[0]`) แล้วเทียบทีละคน มี guard clause คืน `null` ถ้า Array ว่าง

### Method Chaining บรรทัดเดียว
- `cePassedAverage`: ตัวอย่างการ "ต่อฟังก์ชัน" (chaining) `.filter()` → `.map()` → `.reduce()` ในบรรทัดเดียว เพื่อหาคะแนนเฉลี่ยของนักศึกษาสาขา CE ที่สอบผ่านเท่านั้น
  1. `.filter()` — กรองเอาเฉพาะคนที่ `major === "CE"` และ `score >= 50`
  2. `.map()` — ดึงออกมาเฉพาะตัวเลขคะแนน (ทิ้ง object ที่เหลือ)
  3. `.reduce()` — บวกสะสมโดยหารด้วยจำนวนคนในแต่ละรอบ (`score/arr.length`) ทำให้ได้ค่าเฉลี่ยเลยโดยไม่ต้องหารซ้ำอีกครั้งท้ายสุด

### ส่วนที่ 3 — ทดสอบการทำงาน
- **กรณีปกติ**: เรียกทุกฟังก์ชันกับข้อมูลจริง แล้ว log ผลลัพธ์ออกมาดู
- **กรณีขอบ (Edge Case)**: สร้าง `emptyDB = []` (Array ว่าง จำลองกรณีไม่มีข้อมูลจาก Database) แล้วเรียกทุกฟังก์ชันซ้ำ เพื่อพิสูจน์ว่า:
  - `getNames`, `getPassedStudents` คืน Array ว่าง `[]` ไม่ error
  - `getTotalScore` คืน `0`
  - `getAverageScore` คืน `0` (ไม่ใช่ `NaN`)
  - `countByGrade` คืน Object ว่าง `{}`
  - `getTopStudent` คืน `null` (ไม่ error แม้ไม่มีข้อมูลให้เปรียบเทียบ)

---