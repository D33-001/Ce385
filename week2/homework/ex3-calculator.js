// ตัวแปรเกณฑ์คงที่ (Constants) 
// ห้ามพิมพ์ตัวเลขดิบกลางสูตรตามกฎของวิชา
const MAX_WORKSHOP_RAW = 60;   // คะแนนดิบเต็มของ Workshop
const WORKSHOP_WEIGHT = 20;    // สัดส่วนคะแนน Workshop ที่จะนำไปคิดเกรด
const MAX_TOTAL_SCORE = 100;   // คะแนนรวมเต็มทั้งหมด
const TARGET_A_SCORE = 80;     // คะแนนเป้าหมาย

// ส่วนที่ 2 — สร้างตัวแปรเก็บคะแนนดิบ
const workshopRaw = 47;
const attendance = 9;
const project = 16;
const midterm = 15;
const final = 24;

// ส่วนที่ 3 — คำนวณคะแนนตามสูตร
// แปลงคะแนน Workshop โดยเทียบบัญญัติไตรยางศ์ (คะแนนดิบ / คะแนนดิบเต็ม) * น้ำหนักคะแนน
const workshopScore = (workshopRaw / MAX_WORKSHOP_RAW) * WORKSHOP_WEIGHT;

// คำนวณคะแนนรวมทั้งหมด
const totalScore = workshopScore + attendance + project + midterm + final;

// คำนวณเปอร์เซ็นต์ (คะแนนรวม / คะแนนเต็มทั้งหมด) * 100
const percentage = (totalScore / MAX_TOTAL_SCORE) * 100;

// คำนวณคะแนนที่ขาดเพื่อเป้าหมาย
const pointsNeeded = TARGET_A_SCORE - totalScore;

// แสดงผลเป็นใบสรุปคะแนนด้วย Template Literal
// หมายเหตุ: ใช้ .toFixed(2) ตอนแสดงผลเท่านั้น เพื่อป้องกันบั๊กการนำข้อความไปบวกต่อ
console.log(` ใบสรุปคะแนนวิชา CE385
คะแนน Workshop (แปลงแล้ว) : ${workshopScore.toFixed(2)} / ${WORKSHOP_WEIGHT}
คะแนนเข้าห้องเรียน       : ${attendance.toFixed(2)}
คะแนนโปรเจกต์           : ${project.toFixed(2)}
คะแนนสอบกลางภาค        : ${midterm.toFixed(2)}
คะแนนสอบปลายภาค        : ${final.toFixed(2)}
----------------------------------
คะแนนรวมทั้งหมด         : ${totalScore.toFixed(2)} / ${MAX_TOTAL_SCORE}
คิดเป็นเปอร์เซ็นต์         : ${percentage.toFixed(2)}%
คะแนนที่ต้องการเพื่อได้ 80   : ${pointsNeeded.toFixed(2)} คะแนน`);