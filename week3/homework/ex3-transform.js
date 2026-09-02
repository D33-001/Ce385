// ==========================================
// ส่วนที่ 0 — ข้อมูลจำลอง และ ฟังก์ชันช่วยเหลือ (Helper)
// ==========================================
const students = [
  { id: "001", name: "สมชาย", major: "", score: 85 },
  { id: "002", name: "สมหญิง", major: "IT", score: 72 },
  { id: "003", name: "วิชัย", major: "CE", score: 66 },
  { id: "", name: "มาลี", major: "IT", score: 77 },
  { id: "005", name: "สมบูรณ์", major: "CE", score: 60 },
  { id: "006", name: "", major: "IT", score: 55 }
];

// Helper: นำตรรกะตัดเกรดจากข้อก่อนหน้ามาใช้ (เป็น Pure Function)
const toGrade = (score) => {
  if (score >= 80) return 'A';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 55) return 'D+';
  if (score >= 50) return 'D';
  return 'F';
};

// ==========================================
// ส่วนที่ 1 — ฟังก์ชันแปลงข้อมูล (ห้ามใช้ for / while)
// ==========================================

// 1. ดึงเฉพาะชื่อทุกคน
const getNames = (studentsArray) => {
  // .map() จะแปลงจากก้อน Object ให้เหลือแค่ String (ชื่อ)
  return studentsArray.map((student) => student.name);
};

// 2. ดึงเฉพาะคนที่สอบผ่าน (>= 50)
const getPassedStudents = (studentsArray) => {
  // .filter() จะคัดลอกเฉพาะก้อน Object ที่เงื่อนไขเป็น true ลง Array ใหม่
  return studentsArray.filter((student) => student.score >= 50);
};

// 3. หาผลรวมคะแนนทั้งหมด
const getTotalScore = (studentsArray) => {
  // .reduce() จะสะสมค่าไปเรื่อยๆ โดยมี 0 เป็นค่าเริ่มต้น (Initial Value)
  return studentsArray.reduce((sum, student) => sum + student.score, 0);
};

// 4. หาคะแนนเฉลี่ย (ป้องกัน NaN)
const getAverageScore = (studentsArray) => {
  // Guard Clause: ถ้า Array ว่าง ให้ตอบ 0 ทันที ป้องกันการหารด้วย 0 (ซึ่งจะได้ NaN)
  if (studentsArray.length === 0) return 0;
  
  const total = getTotalScore(studentsArray);
  // ใช้ Number() เพื่อแปลงกลับเป็นตัวเลข หลังจากที่ .toFixed() ทำให้เป็น String
  return Number((total / studentsArray.length).toFixed(2)); 
};

// 5. นับจำนวนคนตามเกรด
const countByGrade = (studentsArray) => {
  // ใช้ {} (Object ว่าง) เป็นค่าเริ่มต้นเพื่อใช้เก็บผลลัพธ์การนับ
  return studentsArray.reduce((acc, student) => {
    const grade = toGrade(student.score);
    // ถ้ามีเกรดนี้ใน Object แล้วให้บวก 1 ถ้ายังไม่มีให้ตั้งค่าเป็น 1
    acc[grade] = (acc[grade] || 0) + 1; 
    return acc;
  }, {}); 
};

// 6. หานักศึกษาที่คะแนนสูงสุด
const getTopStudent = (studentsArray) => {
  if (studentsArray.length === 0) return null; // ป้องกัน Error หาก Array ว่าง
  
  // ใช้คนแรกของ Array เป็นค่าเริ่มต้น แล้วเทียบทีละคน
  return studentsArray.reduce((top, current) => {
    return current.score > top.score ? current : top;
  }, studentsArray[0]); 
};

// ==========================================
// ส่วนที่ 2 — ท่อข้อมูล (Method Chaining) บรรทัดเดียว
// ==========================================
// หาคะแนนเฉลี่ยของเด็ก CE ที่สอบผ่าน โดยต่อ filter -> map -> reduce
const cePassedAverage = students
  .filter((s) => s.major === "CE" && s.score >= 50)     // 1. กรองเอา CE ที่ >= 50
  .map((s) => s.score)                                  // 2. ดึงออกมาแค่ตัวเลขคะแนน
  .reduce((sum, score, _, arr) => sum + score / arr.length, 0); // 3. หารและบวกสะสม

// ==========================================
// ส่วนที่ 3 — ทดสอบการทำงาน (Testing)
// ==========================================
console.log("===== ทดสอบผลลัพธ์ปกติ =====");
console.log("รายชื่อ:", getNames(students));
console.log("คนผ่าน:", getPassedStudents(students));
console.log("คะแนนรวม:", getTotalScore(students));
console.log("คะแนนเฉลี่ย:", getAverageScore(students));
console.log("สรุปเกรด:", countByGrade(students));
console.log("คนได้ท็อป:", getTopStudent(students));
console.log(`คะแนนเฉลี่ย CE ที่ผ่าน (Chaining): ${cePassedAverage.toFixed(2)}`);

console.log("\n===== ทดสอบกรณีขอบ (Edge Cases: Array ว่าง) =====");
// สร้าง Array ว่างเพื่อจำลองกรณีที่ Database ไม่มีข้อมูลส่งมาเลย
const emptyDB = []; 

console.log("รายชื่อ (ว่าง):", getNames(emptyDB));
console.log("คนผ่าน (ว่าง):", getPassedStudents(emptyDB));
console.log("คะแนนรวม (ว่าง):", getTotalScore(emptyDB));
console.log("คะแนนเฉลี่ย (ว่าง):", getAverageScore(emptyDB));      // ต้องเป็น 0 ไม่ใช่ NaN
console.log("สรุปเกรด (ว่าง):", countByGrade(emptyDB));          // ต้องเป็น {}
console.log("คนได้ท็อป (ว่าง):", getTopStudent(emptyDB));        // ต้องเป็น null ไม่ Error