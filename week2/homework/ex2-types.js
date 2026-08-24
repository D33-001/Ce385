// ส่วนที่ 1 — สร้างตัวแปรให้ครบ 6 ชนิดและแสดงผล
const myString = "สวัสดี";
const myNumber = 42;
const myBoolean = true;
let myUndefined; // ประกาศตัวแปรแต่ยังไม่กำหนดค่า จะมีค่าเป็น undefined อัตโนมัติ
const myNull = null; // ตั้งใจกำหนดให้ไม่มีค่า
const myArray = [1, 2, 3]; 

console.log(`ค่า: ${myString} | ชนิด: ${typeof myString}`);
console.log(`ค่า: ${myNumber} | ชนิด: ${typeof myNumber}`);
console.log(`ค่า: ${myBoolean} | ชนิด: ${typeof myBoolean}`);
console.log(`ค่า: ${myUndefined} | ชนิด: ${typeof myUndefined}`);
console.log(`ค่า: ${myNull} | ชนิด: ${typeof myNull}`);
console.log(`ค่า: ${myArray} | ชนิด: ${typeof myArray}`);

console.log("\n------------------------------------------\n");

// ส่วนที่ 2 — ตอบคำถามด้วยโค้ด
// typeof null ได้ผลว่าอะไร?
console.log(`1. typeof null ได้ผลเป็น: "${typeof null}"`);
console.log(`   (ผลลัพธ์นี้ไม่ถูกต้องตามความเป็นจริง แต่มันคือบั๊กที่ติดมาตั้งแต่
    สร้างภาษา JavaScript และแก้ไม่ได้เพราะจะทำเว็บเก่าพัง)`);

// ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า มีชนิดเป็นอะไร?
let emptyVar;
console.log(`2. ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า มีชนิดเป็น: "${typeof emptyVar}"`);

// typeof NaN ได้ผลว่าอะไร?
const notANumber = Number("abc"); // พยายามแปลงข้อความที่ไม่ใช่ตัวเลขให้เป็นตัวเลข
console.log(`3. typeof NaN ได้ผลเป็น: "${typeof notANumber}"`);

console.log("\n------------------------------------------\n");

// ส่วนที่ 3 — การแปลงชนิด (Type Conversion)
const inputAge = "20";
const inputScore = "85.5";

// แปลง inputAge เป็นตัวเลขแล้วบวก 5 (ใช้ Number() เพื่อไม่ให้เกิด string concatenation)
const correctAge = Number(inputAge) + 5;
console.log(`อายุหลังจากบวกเพิ่ม 5 ปี: ${correctAge}`);

// แปลง inputScore แล้วแสดงผลโดยมีทศนิยม 1 ตำแหน่ง
const formattedScore = Number(inputScore).toFixed(1);
console.log(`คะแนนแบบทศนิยม 1 ตำแหน่ง: ${formattedScore}`);

// ตรวจสอบความแตกต่างระหว่างการใช้ === (Strict Equality)
console.log(`inputAge === 20 ได้ผล: ${inputAge === 20}`);
console.log(`Number(inputAge) === 20 ได้ผล: ${Number(inputAge) === 20}`);