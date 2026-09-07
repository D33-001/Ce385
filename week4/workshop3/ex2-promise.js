// ข้อมูลจำลองและ Helper Function
const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 85 },
  { id: "6502", name: "สมหญิง", major: "IT", score: 72 },
  { id: "6503", name: "วิชัย", major: "CE", score: 45 },
  { id: "6504", name: "มาลี", major: "IT", score: 90 }
];

// Helper: กฎตัดเกรดเดิม
const toGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "F";
};

// เขียน fetchStudentByIdAsync(id) คืนค่า Promise
const fetchStudentByIdAsync = (id) => {
  // ห้ามใช้คำว่า async เราจึงห่อหุ้มด้วย new Promise แทน
  return new Promise((resolve, reject) => {
    // 1. Validation (ย้ายมาไว้ใน executor): อย่าเชื่อ Client
    if (typeof id !== "string" || id.trim() === "") {
      // ใช้ reject เพื่อพ่น Error เข้าสู่ท่อของ Promise
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง")); 
    }

    // 2. Data Layer Simulation (หน่วง 300ms)
    setTimeout(() => {
      const student = students.find((s) => s.id === id);

      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }

      // 3. Immutability: คืนค่าสำเนา Object เมื่อค้นพบ (resolve)
      resolve({ ...student });
    }, 300);
  });
};

// เรียกใช้ครบ 3 กรณีด้วย .then / .catch / .finally
console.log("--- เริ่มการเรียกใช้ 3 กรณี ---");

// ) id ที่มีจริง
fetchStudentByIdAsync("6501")
  .then((student) => console.log("กรณี 1) สำเร็จ:", student))
  .catch((error) => console.error("กรณี 1) ล้มเหลว:", error.message))
  .finally(() => console.log("กรณี 1) จบการทำงาน (finally)\n"));

// ) id ที่ไม่มีจริง
fetchStudentByIdAsync("9999")
  .then((student) => console.log("กรณี 2) สำเร็จ:", student))
  .catch((error) => console.error("กรณี 2) ล้มเหลว:", error.message))
  .finally(() => console.log("กรณี 2) จบการทำงาน (finally)\n"));

// ) id ผิดรูปแบบ (Number)
fetchStudentByIdAsync(42)
  .then((student) => console.log("กรณี 3) สำเร็จ:", student))
  .catch((error) => console.error("กรณี 3) ล้มเหลว:", error.message))
  .finally(() => console.log("กรณี 3) จบการทำงาน (finally)\n"));

  // เขียน "โซ่" 3 ขั้น (Promise Chaining)
  fetchStudentByIdAsync("6501")
  .then((student) => {
    // ขั้น 1: แปลงเป็น { name, grade }
    return { name: student.name, grade: toGrade(student.score) };
  })
  .then((data) => {
    // ขั้น 2: แปลงเป็นข้อความรายงาน 1 บรรทัด
    return `รายงาน: นักศึกษา ${data.name} ได้เกรด ${data.grade}`;
  })
  .then((report) => {
    // ขั้น 3: พิมพ์ออกทาง console
    console.log("--- โซ่ 3 ขั้น ---");
    console.log(report);
  })
  .catch((error) => {
    // กฎเหล็ก: ต้องมี .catch ปิดท้ายเสมอ ป้องกัน Unhandled Rejection
    console.error("โซ่ล้มเหลว:", error.message);
  });

// ฟังก์ชันอเนกประสงค์ promisify(fn)
// รับฟังก์ชันแบบ error-first callback ดั้งเดิม และคืนค่าเป็น Promise
const promisify = (fn) => {
  // รับ Arguments ทั้งหมด (...args) มาเตรียมส่งให้ฟังก์ชันเดิม
  return (...args) => {
    return new Promise((resolve, reject) => {
      // เรียกฟังก์ชันเดิม พร้อมส่ง Callback ไปดักจับผลลัพธ์
      fn(...args, (error, result) => {
        if (error !== null) {
          return reject(error);
        }
        resolve(result);
      });
    });
  };
};

// จำลองฟังก์ชันอ่านไฟล์แบบดั้งเดิม (Error-first Callback)
const dummyReadFile = (fileName, callback) => {
  setTimeout(() => {
    if (fileName === "config.json") {
      callback(null, "{ status: 'ok' }");
    } else {
      callback(new Error("File Not Found"), null);
    }
  }, 100);
};

const readFileAsync = promisify(dummyReadFile);

readFileAsync("config.json")
  .then((data) => console.log("\n[Bonus] อ่านไฟล์สำเร็จ:", data))
  .catch((err) => console.error("\n[Bonus] อ่านไฟล์พลาด:", err.message));