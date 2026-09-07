// เครื่องมือจำลอง
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

// ฟังก์ชันเสริมสำหรับสร้าง Timeout (สถานการณ์ที่ 4)
const timeoutPromise = (ms) =>
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout ${ms}ms`)), ms);
  });

// Main Orchestrator: เรียงทั้ง 4 สถานการณ์

const main = async () => {
  console.log("=== เริ่มการทำงานระบบตรวจจับ (Combinators) ===");

  // ---------------------------------------------------------
  // สถานการณ์ 1: หน้าแรก "โปรไฟล์" + "ตารางเรียน" + "ประกาศ"
  // เหตุผล: เลือกใช้ Promise.all เพราะระบบต้องการชิ้นส่วน "ครบทุกชิ้น" 
  // หากชิ้นใดชิ้นหนึ่งพัง ต้องหยุดทันที (Fail-fast) ไม่เปิดหน้าเว็บที่แหว่งๆ ให้ผู้ใช้เห็น
  // ---------------------------------------------------------
  console.log("\n[สถานการณ์ 1] Promise.all");
  
  // ทดสอบแบบสำเร็จทั้งหมด
  try {
    const successResult = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log(`เปิดหน้าแรก: ${successResult.join(" · ")}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }

  // ทดสอบแบบมีตัวล้มเหลว (ประกาศ willFail=true)
  try {
    await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true)
    ]);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: <error> ${error.message}`);
  }

  // ---------------------------------------------------------
  // สถานการณ์ 2: แจ้งเตือนผลสอบ "อีเมล" · "SMS" · "แอป"
  // เหตุผล: เลือกใช้ Promise.allSettled เพราะต้องการรู้ผลลัพธ์ของ "ทุกช่องทาง" 
  // แม้ SMS จะล่ม ระบบก็ต้องบันทึกว่าอีเมลกับแอปส่งสำเร็จแล้ว โดยไม่ทำให้โค้ดหลัก Crash
  // ---------------------------------------------------------
  console.log("\n[สถานการณ์ 2] Promise.allSettled");
  const notificationResults = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true), // SMS ล้มเหลว
    wait(400, "แอป")
  ]);

  console.log("รายงานสถานะแจ้งเตือน:");
  notificationResults.forEach((result, index) => {
    // ใช้ Strict Equality (===) ตรวจสถานะที่คืนกลับมาจาก allSettled
    if (result.status === "fulfilled") {
      console.log(`- ช่องทาง ${index + 1}: สำเร็จ (${result.value})`);
    } else {
      console.log(`- ช่องทาง ${index + 1}: ทำรายการพัง (${result.reason.message})`);
    }
  });

  // ---------------------------------------------------------
  // สถานการณ์ 3: mirror server A (ล้ม) · mirror server B (สำเร็จ)
  // เหตุผล: เลือกใช้ Promise.any เพราะเราสนใจแค่เซิร์ฟเวอร์ตัวแรกที่ "สำเร็จ" เท่านั้น
  // เพื่อให้ระบบทำงานได้เร็วที่สุด โดยเมินตัวที่ล้มเหลวไปได้เลย
  // ---------------------------------------------------------
  console.log("\n[สถานการณ์ 3] Promise.any");
  try {
    const fastestSuccess = await Promise.any([
      wait(300, "mirror-A", true), // ล้มเหลวแต่จะถูกเมิน
      wait(600, "mirror-B")        // สำเร็จ
    ]);
    console.log(`ใช้ข้อมูลจาก: ${fastestSuccess}`);
  } catch (error) {
    console.log(`เซิร์ฟเวอร์ร่วงหมดเลย: ${error.message}`);
  }
  // ---------------------------------------------------------
  // สถานการณ์ 4: ค้นหาฐานข้อมูล (1200ms) แต่ผู้ใช้รอได้ (800ms)
  // เหตุผล: เลือกใช้ Promise.race เพราะต้องการนำตัวโหลดข้อมูลมา "แข่ง" กับตัวจับเวลา
  // ใครเสร็จก่อน (ไม่ว่าจะสำเร็จหรือล้ม) ให้ตอบกลับทันที (Timeout Pattern)
  // ---------------------------------------------------------
  console.log("\n[สถานการณ์ 4] Promise.race (Timeout Pattern)");
  try {
    const dbQuery = wait(1200, "ฐานข้อมูลจริง");
    const timeout = timeoutPromise(800); // ตัวตัดเวลา
    
    // แข่งกันระหว่าง dbQuery กับ timeout ใครเสร็จก่อนจะได้ผลลัพธ์ทันที
    const data = await Promise.race([dbQuery, timeout]);
    console.log(`ดึงข้อมูลสำเร็จ: ${data}`);
  } catch (error) {
    // หาก Timeout ชนะ (เสร็จก่อนที่ 800ms) มันจะโยน Error เข้ามาที่นี่
    console.log(`เกิน 800ms เลิกรอ -> ใช้แคชเก่าแทน (${error.message})`);
  }

  console.log("\n=== จบการทำงานทั้ง 4 สถานการณ์ ===");
};

// เรียกใช้ฟังก์ชันควบคุมหลัก
main();