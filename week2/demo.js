console.log("Hello, World!");

const name = "สมศรี", score = 95;

// แบบเก่า: ต่อข้อความด้วย + อ่านยากและพลาดง่าย
console.log("แบบเก่า : ชื่อ " + name + " ได้ " + score + " คะแนน");

// แบบใหม่: Template Literal ใช้ backtick ` ` และ ${ }
console.log(`แบบใหม่ : ชื่อ ${name} ได้ ${score} คะแนน`);

// ใส่ "นิพจน์" ลงไปได้ ไม่ใช่แค่ตัวแปร
console.log(`ครึ่งหนึ่งของคะแนนคือ ${score / 2}`);
console.log(`ผ่านเกณฑ์หรือไม่ — ${score >= 50 ? "ผ่าน" : "ไม่ผ่าน"}`);

console.warn("console.warn — คำเตือน");
console.error("console.error — ข้อผิดพลาด");

// ชนิดข้อมูลและการแปลงค่า
console.log("6 '5' + 3 =", 5 + 3);
console.log("7 '5' - 3 =", 5 - 3); 
console.log("8 0.1 + 0.2 =", 0.1 + 0.2);
console.log("9 0.1 + 0.2 === 0.3 ?", 0.1 + 0.2 === 0.3);
console.log("10 10/0 =", 10 / 0);
console.log("11 'abc' * 2 =", 'abc' * 2);  



function getPriceBuggy(size) {
  let price = 0;
  switch (size) {
    case "S":  price = 30; break;
    case "M":  price = 45; break;
    case "L":  price = 60; break;
    default:   price = 0;
  }
  return price;
}

function getPriceFixed(size) {
  switch (size) {
    case "S": return 30;
    case "M": return 45;
    case "L": return 60;
    default:  return 0;
    
  }
}

for (const s of ["S", "M", "L", "XL"]) {
  console.log("ขนาด " + s + " → มีบั๊ก: " + getPriceBuggy(s) + " | แก้แล้ว: " + getPriceFixed(s));
}