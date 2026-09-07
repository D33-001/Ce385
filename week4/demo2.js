const STUDENTS = [{ id: "6501", name: "สมชาย", score: 78 }];

function fetchStudentById(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(STUDENTS.find((s) => s.id === id)), 400);
  });
}

fetchStudentById("6501")
  .then((student) => {
    console.log("ขั้น 1: ได้นักศึกษา =", student.name);
    return student.score;
  })
  .then((score) => {
    console.log("ขั้น 2: ได้คะแนน   =", score);
    return score >= 60 ? "B" : "F";
  })
  .then((grade) => {
    console.log("ขั้น 3: ได้เกรด     =", grade);
  });