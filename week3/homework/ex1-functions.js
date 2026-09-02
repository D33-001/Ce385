// ==========================================
// ส่วนที่ 0 — ตัวแปรเกณฑ์คงที่ (Constants)
// ==========================================
const MIN_SCORE = 0;
const MAX_SCORE = 100;
const DEFAULT_WORKSHOP_FULL = 60;
const DEFAULT_WORKSHOP_WEIGHT = 20;

// กฎการตัดเกรด (Business Rules) เก็บเป็น Array ของ Object
const GRADE_RULES = [
  { min: 80, grade: 'A' },
  { min: 75, grade: 'B+' },
  { min: 70, grade: 'B' },
  { min: 65, grade: 'C+' },
  { min: 60, grade: 'C' },
  { min: 55, grade: 'D+' },
  { min: 50, grade: 'D' },
  { min: 0, grade: 'F' }
];

// ==========================================
// ส่วนที่ 1 — ฟังก์ชันคำนวณ (ใช้ Arrow Function 2 ตัว)
// ==========================================

// 1. ฟังก์ชันตรวจสอบคะแนน (Data Validation)
const isValidScore = (score) => {
  return typeof score === 'number' && score >= MIN_SCORE && score <= MAX_SCORE;
};

// 2. ฟังก์ชันตัดเกรดด้วย Array + find
const toGrade = (score) => {
  // กฎเหล็ก: ต้องตรวจสอบข้อมูลก่อนประมวลผลเสมอ (อย่าเชื่อ Client)
  if (!isValidScore(score)) {
    return 'Invalid Data'; 
  }
  
  // ใช้ .find() วิ่งหากฎข้อแรกที่เป็นจริง (เนื่องจากเราเรียงจากมากไปน้อยไว้แล้ว)
  const rule = GRADE_RULES.find((r) => score >= r.min);
  return rule ? rule.grade : 'F'; // ใช้ Ternary Operator คืนค่าเกรด
};

// 3. ฟังก์ชันแปลงคะแนน (มี Default Parameters)
const calculateWorkshopScore = (raw, full = DEFAULT_WORKSHOP_FULL, weight = DEFAULT_WORKSHOP_WEIGHT) => {
  return (raw / full) * weight;
};

// 4. ฟังก์ชันคำนวณคะแนนรวม (ใช้ Function ปกติ)
function calculateTotal(workshop, attendance, project, midterm, final) {
  return workshop + attendance + project + midterm + final;
}

// ==========================================
// ส่วนที่ 2 — ทดสอบข้อมูลนักศึกษา 3 คน
// ==========================================
// จำลองข้อมูลจาก Database หรือ Client
const students = [
  { id: "001", rawWs: 48, att: 9, proj: 17, mid: 15, fin: 24 },
  { id: "002", rawWs: 30, att: 10, proj: 15, mid: 10, fin: 20 },
  { id: "003", rawWs: -5, att: 10, proj: 15, mid: 10, fin: 20 } // คนนี้ส่งข้อมูลผิดปกติ (ติดลบ)
];

console.log("===== ผลการประเมินนักศึกษา =====");
const results = students.map((std) => {
  // เรียกใช้ฟังก์ชันประมวลผล
  const wsScore = calculateWorkshopScore(std.rawWs);
  const total = calculateTotal(wsScore, std.att, std.proj, std.mid, std.fin);
  const grade = toGrade(total);
  
  // จัดรูปเพื่อแสดงผลเป็นตารางง่ายๆ
  return {
    รหัส: std.id,
    คะแนนรวม: total,
    เกรด: grade
  };
});

console.table(results);

// ==========================================
// ส่วนที่ 3 — พิสูจน์ค่าเริ่มต้น (Default Parameters)
// ==========================================
console.log("\n===== พิสูจน์การทำงานของ Default Parameters =====");

const score1 = calculateWorkshopScore(48);
const score2 = calculateWorkshopScore(48, 60, 20);

console.log(`เรียกแบบไม่ส่งค่า VS ส่งค่าเต็ม: ได้ผลเท่ากันคือ ${score1 === score2}`); // ต้องแสดงผลเป็น true

const score3 = calculateWorkshopScore(48, undefined, 25);
console.log(`ผลลัพธ์ของกรณีที่ 3 คือ: ${score3}`);
