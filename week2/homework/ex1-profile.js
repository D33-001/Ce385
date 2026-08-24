// ประกาศตัวแปรเก็บข้อมูลส่วนตัว 5 อย่าง โดยใช้ const เนื่องจากเป็นค่าคงที่
const nickname = "ดี";
const studentId = "67111744";
const age = 22;
const major = "วิศวกรรมคอมพิวเตอร์";
const registeredCourses = 6;

// ประกาศตัวแปรสำหรับการคำนวณปีที่จะจบ (ปีการศึกษาปัจจุบันคือ 2569)
const currentYear = 2569;
const remainingYears = 2;
const graduationYear = currentYear + remainingYears; // คำนวณจากตัวแปรตามเงื่อนไข

// แสดงผลด้วย console.log โดยใช้ Template Literal แบบหลายบรรทัด
console.log(` บัตรแนะนำตัว
ชื่อเล่น      : ${nickname}
รหัสนักศึกษา  : ${studentId}
อายุ        : ${age} ปี
สาขาวิชา    : ${major}
ลงทะเบียน   : ${registeredCourses} วิชา
ปีที่จะจบ     : ${graduationYear}`);