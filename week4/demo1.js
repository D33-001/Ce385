const STUDENTS = [
  { id: "6501", name: "สมชาย", score: 78 },
  { id: "6502", name: "สมหญิง", score: 92 },
];

function fetchStudent(id , callback) {
    setTimeout(() => {
        const student = STUDENTS.find((s) => s.id === id);
        callback(student);
    }, 400);
}

fetchStudent("6501", (student) => {
    console.log("ได้ข้อมูล:", student.name);
});
console.log("บรรทัดนี้พิมพ์ก่อนได้ข้อมูล!");