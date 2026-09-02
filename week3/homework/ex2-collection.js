// ==========================================
// ส่วนที่ 1 — สร้างข้อมูลตั้งต้น (Mock Data)
// ==========================================
// ใช้ const เสมอ เพื่อป้องกันไม่ให้เผลอเขียนทับตัวแปร students ทั้งก้อน
const students = [
  { id: "001", name: "สมชาย", major: "CE", score: 85, contact: { email: "somchai@test.com", phone: "0811111111" } },
  { id: "002", name: "สมหญิง", major: "IT", score: 72, contact: { email: "somying@test.com", phone: "0822222222" } },
  { id: "003", name: "วิชัย", major: "CE", score: 45, contact: { email: "wichai@test.com", phone: "0833333333" } }, // คนนี้คะแนน < 50
  { id: "004", name: "มาลี", major: "IT", score: 90, contact: { email: "malee@test.com", phone: "" } },
  { id: "005", name: "สมบูรณ์", major: "CE", score: 60, contact: { email: "somboon@test.com", phone: "0855555555" } },
  { id: "006", name: "วิไล", major: "IT", score: 55, contact: { email: "", phone: "0866666666" } }
];

// ==========================================
// ส่วนที่ 2 — เขียนฟังก์ชันค้นหา (Pure Functions)
// ==========================================

// 1. ค้นหานักศึกษาจาก ID (คืนค่า Object หรือ undefined)
const findById = (studentsArray, id) => {
  // .find() จะหยุดทำงานและคืนค่าทันทีเมื่อเจอเงื่อนไขที่เป็นจริง (===)
  return studentsArray.find((student) => student.id === id);
};

// 2. ค้นหานักศึกษาตามสาขาวิชา (คืนค่า Array)
const findByMajor = (studentsArray, major) => {
  // .filter() จะเก็บทุกตัวที่ตรงเงื่อนไขลงใน Array ใหม่
  return studentsArray.filter((student) => student.major === major);
};

// 3. ตรวจสอบว่ามีคนตกหรือไม่ (คืนค่า true/false)
const hasFailingStudent = (studentsArray) => {
  // .some() จะคืนค่า true ทันทีถ้ามีอย่างน้อย 1 คนที่เข้าเงื่อนไข (score < 50)
  return studentsArray.some((student) => student.score < 50);
};

// 4. ดึงอีเมลอย่างปลอดภัย
const getEmail = (studentsArray, id) => {
  // นำฟังก์ชัน findById ที่เขียนไว้แล้วมา Reuse
  const student = findById(studentsArray, id);
  
  // ใช้ ?. (Optional Chaining) เพื่อดึงค่า ถ้า student หรือ contact เป็น undefined จะไม่ error
  // ใช้ ?? (Nullish Coalescing) เพื่อคืนค่าฝั่งขวาหากฝั่งซ้ายเป็น null หรือ undefined
  return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
};

// ==========================================
// ส่วนที่ 3 — ทดสอบการทำงาน (Testing)
// ==========================================

console.log("===== ทดสอบผลลัพธ์ฟังก์ชัน =====");
console.log("ค้นหา CE:", findByMajor(students, "CE"));
console.log(`มีคนตกหรือไม่?: ${hasFailingStudent(students)}`);

console.log("\n===== ทดสอบกรณีหาไม่เจอ (ป้องกันเซิร์ฟเวอร์พัง) =====");
console.log(`ค้นหารหัส 9999:`, findById(students, "9999")); // ต้องได้ undefined แบบโปรแกรมไม่พัง
console.log(`อีเมลรหัส 9999: ${getEmail(students, "9999")}`);

console.log("\n===== ทดสอบ Immutability (สร้าง Array ใหม่แทน push) =====");
// สร้างนักศึกษาใหม่ที่ไม่มี Object contact
const newStudent = { id: "007", name: "ใจดี", major: "IT", score: 70 }; 

// ใช้ Spread Operator (...) ดึงข้อมูลเก่ามากางออก แล้วต่อด้วยข้อมูลใหม่
const updatedStudents = [...students, newStudent];

console.log(`ดึงอีเมลคนไม่มี contact (007): ${getEmail(updatedStudents, "007")}`);