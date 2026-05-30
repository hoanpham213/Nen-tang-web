// ============================================================
// student_data.js — Xử lý dữ liệu sinh viên
// Chạy: node student_data.js
// ============================================================

const students = [
    { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
    { name: "Bình",  math: 6,  physics: 9, cs: 7, gender: "F" },
    { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
    { name: "Dũng",  math: 5,  physics: 5, cs: 6, gender: "M" },
    { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
    { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];

// ====================================================
// 1. Tính điểm TB và xếp loại cho mỗi sinh viên
// ====================================================

function tinhTB(sv) {
    // math×0.4 + physics×0.3 + cs×0.3
    return sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
}

function xepLoai(tb) {
    if (tb >= 8.0) return "Giỏi";
    if (tb >= 6.5) return "Khá";
    if (tb >= 5.0) return "Trung bình";
    return "Yếu";
}

// Thêm điểm TB và xếp loại vào từng sinh viên
for (let i = 0; i < students.length; i++) {
    students[i].tb = Math.round(tinhTB(students[i]) * 10) / 10;
    students[i].xepLoai = xepLoai(students[i].tb);
}

// ====================================================
// 2. In bảng kết quả
// ====================================================

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    const sv = students[i];
    const stt   = String(i + 1).padEnd(3);
    const ten   = sv.name.padEnd(6);
    const tb    = String(sv.tb).padEnd(4);
    const loai  = sv.xepLoai.padEnd(11);
    console.log(`| ${stt} | ${ten} | ${tb} | ${loai} |`);
}

// ====================================================
// 3. Đếm số SV mỗi xếp loại
// ====================================================

const demLoai = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };

for (let i = 0; i < students.length; i++) {
    demLoai[students[i].xepLoai]++;
}

console.log("\n===== Thống kê xếp loại =====");
console.log(`Giỏi:       ${demLoai["Giỏi"]} sinh viên`);
console.log(`Khá:        ${demLoai["Khá"]} sinh viên`);
console.log(`Trung bình: ${demLoai["Trung bình"]} sinh viên`);
console.log(`Yếu:        ${demLoai["Yếu"]} sinh viên`);

// ====================================================
// 4. Tìm SV cao nhất và thấp nhất
// ====================================================

let svCaoNhat = students[0];
let svThapNhat = students[0];

for (let i = 1; i < students.length; i++) {
    if (students[i].tb > svCaoNhat.tb) svCaoNhat = students[i];
    if (students[i].tb < svThapNhat.tb) svThapNhat = students[i];
}

console.log("\n===== Điểm cao nhất / thấp nhất =====");
console.log(`Cao nhất: ${svCaoNhat.name} — ${svCaoNhat.tb} (${svCaoNhat.xepLoai})`);
console.log(`Thấp nhất: ${svThapNhat.name} — ${svThapNhat.tb} (${svThapNhat.xepLoai})`);

// ====================================================
// 5. Điểm TB toàn lớp theo từng môn
// ====================================================

let tongMath = 0, tongPhysics = 0, tongCs = 0;

for (let i = 0; i < students.length; i++) {
    tongMath    += students[i].math;
    tongPhysics += students[i].physics;
    tongCs      += students[i].cs;
}

const n = students.length;
console.log("\n===== Điểm TB toàn lớp theo môn =====");
console.log(`Toán:   ${(tongMath / n).toFixed(2)}`);
console.log(`Lý:     ${(tongPhysics / n).toFixed(2)}`);
console.log(`CNTT:   ${(tongCs / n).toFixed(2)}`);

// ====================================================
// BONUS: Điểm TB theo giới tính
// ====================================================

let tongNam = 0, demNam = 0;
let tongNu  = 0, demNu  = 0;

for (let i = 0; i < students.length; i++) {
    if (students[i].gender === "M") {
        tongNam += students[i].tb;
        demNam++;
    } else {
        tongNu += students[i].tb;
        demNu++;
    }
}

console.log("\n===== BONUS: Điểm TB theo giới tính =====");
console.log(`Nam (${demNam} SV): TB = ${(tongNam / demNam).toFixed(2)}`);
console.log(`Nữ  (${demNu} SV): TB = ${(tongNu  / demNu).toFixed(2)}`);