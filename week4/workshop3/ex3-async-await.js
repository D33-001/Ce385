// ข้อมูลจำลองและ Promise 
const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 85 },
  { id: "6502", name: "สมหญิง", major: "IT", score: 72 },
  { id: "6503", name: "วิชัย", major: "CE", score: 45 },
  { id: "6504", name: "มาลี", major: "IT", score: 90 }
];

const toGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "F";
};

// ฟังก์ชันจำลองการดึงข้อมูลคืนค่า Promise (หน่วง 300ms)
const fetchStudentByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }
    setTimeout(() => {
      const student = students.find((s) => s.id === id);
      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }
      resolve({ ...student });
    }, 300);
  });
};

// reportSequential() (ดึงทีละคน)
const reportSequential = async () => {
  console.log("--- เริ่มส่วนที่ 1: ดึงข้อมูลตามลำดับ (Sequential) ---");
  const targetIds = ["6501", "6502", "6503"];
  
  const start = Date.now(); // เริ่มจับเวลา
  
  // ใช้ for...of เพื่อบังคับให้ await ทีละรอบ
  for (const id of targetIds) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`ได้ข้อมูล: ${student.name}`);
  }
  
  const timeUsed = Date.now() - start;
  console.log(`[เวลาที่ใช้] แบบตามลำดับ: ${timeUsed} ms\n`);
  
  return timeUsed; // ส่งเวลาไปเปรียบเทียบในส่วนที่ 2
};

// reportParallel() (ดึงพร้อมกัน)
const reportParallel = async (sequentialTime) => {
  console.log("--- เริ่มส่วนที่ 2: ดึงข้อมูลขนาน (Parallel) ---");
  const targetIds = ["6501", "6502", "6503"];
  
  const start = Date.now();
  
  // 1. map สร้าง Array ของ Promise (เริ่มยิงคำขอพร้อมกันทันที)
  const promises = targetIds.map((id) => fetchStudentByIdAsync(id));
  
  // 2. await Promise.all เพื่อรอให้ทุกคนเสร็จพร้อมกัน
  const results = await Promise.all(promises);
  
  // 3. แสดงผลลัพธ์
  for (const student of results) {
    console.log(`ได้ข้อมูล: ${student.name}`);
  }
  
  const timeUsed = Date.now() - start;
  console.log(`[เวลาที่ใช้] แบบขนาน: ${timeUsed} ms`);
  console.log(`แบบขนานเร็วกว่าประมาณ ${(sequentialTime / timeUsed).toFixed(2)} เท่า\n`);
};

// safeReport(id) จัดการข้อผิดพลาด
const safeReport = async (id) => {
  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = toGrade(student.score);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`); // ห้าม Crash! ดักจับได้แล้วโชว์ข้อความ
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`); // ทำงานเสมอไม่ว่าลองหรือพัง
  }
};

// ฟังก์ชันควบคุมหลัก (Main Orchestrator)
const main = async () => {
  // บังคับลำดับ: ต้องจบข้อ 1 ก่อนเริ่มข้อ 2
  const seqTime = await reportSequential();
  await reportParallel(seqTime);
  
  console.log("--- เริ่มส่วนที่ 3: ทดสอบ try-catch-finally ---");
  await safeReport("6504"); // กรณีที่พบ
  await safeReport("9999"); // กรณีที่ไม่พบ
};

// เรียกใช้งาน
main();