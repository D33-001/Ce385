// ส่วนที่ 1 — ฟังก์ชันคำนวณราคาเมนูพื้นฐาน
function getMenuPrice(menu) {
  // switch จะทำการเปรียบเทียบค่าแบบ === เสมอ (เทียบทั้งค่าและชนิดข้อมูล)
  switch (menu) {
    case "ข้าวผัด":
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
      // ตั้งใจใช้ fall-through รวม case เข้าด้วยกัน เพราะทั้ง 3 เมนูราคา 50 บาทเท่ากัน
      return 50;
    case "ผัดไทย":
      return 60;
    case "ต้มยำกุ้ง":
      return 120;
    default:
      // default ขาดไม่ได้ เผื่อกรณีที่ผู้ใช้พิมพ์ชื่อเมนูแปลกๆ เข้ามา
      return 0;
  }
}

// ส่วนที่ 2 — ฟังก์ชันหาตัวคูณตามขนาด
function getSizeMultiplier(size) {
  switch (size) {
    case "ธรรมดา":
      return 1;
    case "พิเศษ":
      return 1.5;
    case "จัมโบ้":
      return 2;
    default:
      return 1; // ขนาดอื่นๆ ที่ไม่รู้จัก ให้คิดเป็นราคาธรรมดา
  }
}

// ส่วนที่ 3 — คำนวณราคารวมของออเดอร์
// สร้าง Array จำลองข้อมูลตะกร้าสินค้าที่ส่งมาจากฝั่ง Client (Frontend)
const orders = [
  { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
  { menu: "ต้มยำกุ้ง", size: "ธรรมดา", qty: 1 },
  { menu: "ข้าวหมูแดง", size: "จัมโบ้", qty: 2 },
  { menu: "ข้าวมันไก่", size: "ธรรมดา", qty: 1 },
  { menu: "กะเพราไก่ไข่ดาว", size: "พิเศษ", qty: 1 } // เมนูนี้ไม่มีในระบบ เพื่อทดสอบ default
];

console.log("บิลรายการอาหาร");

// สร้างตัวแปรสะสมราคารวม (ใช้ let เพราะค่าต้องถูกบวกเพิ่มเรื่อยๆ)
let totalBill = 0;

// วนลูปคำนวณทีละรายการ
for (const order of orders) {
  // ดึงตรรกะการคำนวณไปเรียกใช้ฟังก์ชันที่แยกไว้ (Separation of Concerns)
  const basePrice = getMenuPrice(order.menu);
  const multiplier = getSizeMultiplier(order.size);
  
  // คำนวณราคาสุทธิของรายการนั้น (ราคาพื้นฐาน * ตัวคูณ * จำนวน)
  const itemTotal = basePrice * multiplier * order.qty;
  
  // สะสมยอดเข้าบิลรวม
  totalBill = totalBill + itemTotal;

  // แสดงผลตามรูปแบบที่โจทย์กำหนดด้วย Template Literal
  console.log(`${order.menu} (${order.size}) x${order.qty} = ${itemTotal} บาท`);
}

console.log(`ราคารวมทั้งสิ้น: ${totalBill} บาท`);
