// สร้างข้อมูลตั้งต้น (Mock Data)
const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 85 },
  { id: "6502", name: "สมหญิง", major: "IT", score: 72 },
  { id: "6503", name: "วิชัย", major: "CE", score: 45 },
  { id: "6504", name: "มาลี", major: "IT", score: 90 }
];

// ฟังก์ชันดึงข้อมูลตามธรรมเนียม Error-first
const fetchStudentById = (id, callback) => {
  // 1. Validation: อย่าเชื่อไคลเอนต์ ตรวจสอบว่า id ต้องเป็น string และไม่ว่างเปล่า
  if (typeof id !== "string" || id.trim() === "") {
    // ส่ง Error กลับไปที่พารามิเตอร์แรก และใส่ return เพื่อหยุดการทำงาน (Fail-fast)
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"), null);
  }

// 2. จำลองการเชื่อมต่อฐานข้อมูลที่ตอบกลับช้า (300ms)
  setTimeout(() => {
    // ใช้ find ร่วมกับ === เพื่อค้นหาอย่างเข้มงวด
    const student = students.find((s) => s.id === id);

    if (!student) {
      // กรณีค้นแล้วไม่พบ
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`), null);
    }

    // กรณีพบข้อมูล: error เป็น null และคืนค่า "สำเนา" ของ object
    callback(null, { ...student });
  }, 300);
};

// เรียกใช้ครบ 3 กรณี
console.log("--- เริ่มระบบตรวจทะเบียน ---");

// ก) id ที่มีจริง
fetchStudentById("6501", (error, student) => {
  if (error !== null) {
    return console.error("กรณี ก) ล้มเหลว:", error.message); // ตรวจ error ก่อนเสมอ
  }
  console.log("กรณี ก) สำเร็จ:", student);
});

// ข) id ที่ไม่มีจริง
fetchStudentById("9999", (error, student) => {
  if (error !== null) {
    return console.error("กรณี ข) ล้มเหลว:", error.message);
  }
  console.log("กรณี ข) สำเร็จ:", student);
});

// ค) id ผิดรูปแบบ (เช่น ส่ง Number แทน String)
fetchStudentById(42, (error, student) => {
  if (error !== null) {
    return console.error("กรณี ค) ล้มเหลว:", error.message);
  }
  console.log("กรณี ค) สำเร็จ:", student);
});