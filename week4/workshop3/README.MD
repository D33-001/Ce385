### `ex1-callback.js` — Callback Pattern (Error-first Callback)
สร้างฟังก์ชัน `fetchStudentById(id, callback)` เพื่อจำลองการดึงข้อมูลนักศึกษาจากฐานข้อมูลที่มีความหน่วง (300ms) โดยยึดตามธรรมเนียม **Error-first Callback** ของ Node.js กล่าวคือพารามิเตอร์แรกของ callback จะเป็น error เสมอ (เป็น `null` เมื่อสำเร็จ) มีการตรวจสอบความถูกต้องของ input (`id` ต้องเป็น string และไม่ว่างเปล่า) ก่อนเข้าสู่ตรรกะหลัก และทดสอบครบทั้ง 3 กรณี ได้แก่ รหัสที่มีอยู่จริง, รหัสที่ไม่พบ, และรหัสที่ผิดชนิดข้อมูล

### `ex2-promise.js` — Promise Pattern
เขียนฟังก์ชันเดียวกันใหม่ในรูปแบบ `fetchStudentByIdAsync(id)` ที่คืนค่าเป็น **Promise** แทนการรับ callback โดยใช้ `resolve` / `reject` ภายใน executor พร้อมสาธิตการใช้งาน `.then()` / `.catch()` / `.finally()` ครบทั้ง 3 กรณีเช่นเดิม นอกจากนี้ยังมี:
- **Promise Chaining** — ตัวอย่างการต่อ `.then()` 3 ขั้นตอน (แปลงข้อมูล → สร้างข้อความรายงาน → แสดงผล) พร้อม `.catch()` ปิดท้ายเพื่อป้องกัน Unhandled Rejection
- **`promisify(fn)`** — ฟังก์ชันอเนกประสงค์สำหรับแปลงฟังก์ชันแบบ Error-first Callback (เช่นใน ex1) ให้กลายเป็นฟังก์ชันที่คืนค่า Promise โดยอัตโนมัติ พร้อมตัวอย่างการใช้งานกับฟังก์ชันจำลองการอ่านไฟล์ (`dummyReadFile`)

### `ex3-async-await.js` — Async/Await Pattern
นำ `fetchStudentByIdAsync` มาใช้งานผ่าน syntax `async`/`await` เพื่อให้โค้ดอ่านง่ายเหมือนโค้ด synchronous แบ่งเป็น 3 ส่วน:
1. **`reportSequential()`** — ดึงข้อมูลทีละคนด้วย `for...of` + `await` (ตามลำดับ) พร้อมจับเวลาการทำงาน
2. **`reportParallel()`** — ดึงข้อมูลพร้อมกันด้วย `Promise.all` เพื่อเปรียบเทียบความเร็วกับแบบตามลำดับ
3. **`safeReport(id)`** — สาธิตการจัดการข้อผิดพลาดด้วย `try...catch...finally` ให้โปรแกรมไม่ crash แม้ดึงข้อมูลไม่สำเร็จ

ทั้งหมดถูกควบคุมลำดับการทำงานผ่านฟังก์ชัน `main()` เพื่อการันตีว่าส่วนที่ 1 ต้องเสร็จก่อนเริ่มส่วนที่ 2

### `ex4-combinators.js` — Promise Combinators
รวบรวม 4 สถานการณ์การใช้งานจริงที่สาธิตการเลือกใช้ **Promise Combinator** ให้เหมาะกับโจทย์:

| สถานการณ์ | Combinator | เหตุผลที่เลือกใช้ |
|---|---|---|
| โหลดหน้าแรก (โปรไฟล์ + ตารางเรียน + ประกาศ) | `Promise.all` | ต้องการข้อมูลครบทุกชิ้น หากพังชิ้นใดชิ้นหนึ่งให้หยุดทันที (fail-fast) |
| แจ้งเตือนผลสอบ (อีเมล/SMS/แอป) | `Promise.allSettled` | ต้องการรู้ผลลัพธ์ของทุกช่องทาง แม้บางช่องทางจะล้มเหลวก็ไม่ให้กระทบช่องทางอื่น |
| ดึงข้อมูลจาก mirror server สำรอง | `Promise.any` | สนใจแค่เซิร์ฟเวอร์แรกที่ตอบสำเร็จ เพื่อความเร็วสูงสุด |
| ดึงข้อมูลพร้อม timeout | `Promise.race` | ให้ query แข่งกับตัวจับเวลา ใครเสร็จก่อนตอบก่อน (Timeout Pattern) |

## วิธีรันโค้ด
Node.js:
```bash
node ex1-callback.js
node ex2-promise.js
node ex3-async-await.js
node ex4-combinators.js
```
