//  ฟังก์ชันตรวจสอบข้อมูลและตัดเกรด
function toGrade(score) {
  // Data Validation: ตรวจสอบข้อมูลนำเข้าก่อนเสมอ
  // กฎของ Backend: ป้องกันค่าที่ผิดปกติ (เช่น ติดลบ หรือเกิน 100) ไม่ให้เข้าระบบตัดเกรด
  if (score < 0 || score > 100) {
    return "คะแนนไม่ถูกต้อง ต้องอยู่ระหว่าง 0-100";
  }

  // Business Logic: ตรรกะการตัดเกรด
  // ต้องเรียงจากคะแนน "มากไปน้อย" เสมอ เนื่องจากคำสั่ง if/else if จะทำงานและหยุดที่บล็อกแรกที่เป็นจริง
  if (score >= 80) {
    return "A";
  } else if (score >= 75) {
    return "B+";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 65) {
    return "C+";
  } else if (score >= 60) {
    return "C";
  } else if (score >= 55) {
    return "D+";
  } else if (score >= 50) {
    return "D";
  } else {
    return "F";
  }
}


// ทดสอบให้ครบทุกค่า
// สร้าง Array เก็บค่าตัวเลขทั้งหมดที่โจทย์กำหนด เพื่อนำมาวนลูปทดสอบ
const testScores = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

console.log("ผลการทดสอบระบบตัดเกรด");

// ใช้ for...of เพื่อดึงค่าคะแนนจาก Array ออกมาทีละตัว (ไม่ต้องใช้ index แบบ for ปกติ)
for (const score of testScores) {
  const gradeResult = toGrade(score); // เรียกใช้ฟังก์ชันแล้วเก็บผลลัพธ์
  console.log(`คะแนน ${score} -> เกรด ${gradeResult}`);
}