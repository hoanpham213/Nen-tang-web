// ============================================================
// fizzbuzz.js — FizzBuzz classic + custom
// Chạy: node fizzbuzz.js
// ============================================================

// ===== VERSION 1: Classic FizzBuzz =====
console.log("===== Version 1: Classic FizzBuzz (1–100) =====");

const results1 = [];

for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
        results1.push("FizzBuzz");
    } else if (i % 3 === 0) {
        results1.push("Fizz");
    } else if (i % 5 === 0) {
        results1.push("Buzz");
    } else {
        results1.push(String(i));
    }
}

console.log(results1.join(", "));

// ===== VERSION 2: Custom FizzBuzz =====
// Hàm nhận n (giới hạn) và rules (mảng { divisor, word })
// Hoạt động với bất kỳ bộ rules nào

console.log("\n===== Version 2: Custom FizzBuzz =====");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";

        // Duyệt qua tất cả rules, ghép chữ nếu chia hết
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }

        // Nếu không khớp rule nào → in số
        if (output === "") {
            output = String(i);
        }

        // Chỉ in những số đặc biệt (có chữ) để dễ đọc
        if (isNaN(output)) {
            console.log(`${i} → "${output}"`);
        }
    }
}

// Test với 3 rules: Fizz/3, Buzz/5, Jazz/7
console.log("\n--- Rules: Fizz(3), Buzz(5), Jazz(7) — từ 1 đến 30 ---");
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
// → 3=Fizz, 5=Buzz, 6=Fizz, 7=Jazz, 9=Fizz
// → 14=Jazz, 15=FizzBuzz, 21=FizzJazz, 35=BuzzJazz, 105=FizzBuzzJazz

// Kiểm tra riêng các số trong bài
console.log("\n--- Kiểm tra số cụ thể ---");
function checkOne(n, rules) {
    let output = "";
    for (let j = 0; j < rules.length; j++) {
        if (n % rules[j].divisor === 0) output += rules[j].word;
    }
    return output === "" ? String(n) : output;
}

const rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

console.log(`21  → "${checkOne(21,  rules)}"`);   // FizzJazz (3×7)
console.log(`15  → "${checkOne(15,  rules)}"`);   // FizzBuzz (3×5)
console.log(`35  → "${checkOne(35,  rules)}"`);   // BuzzJazz (5×7)
console.log(`105 → "${checkOne(105, rules)}"`);   // FizzBuzzJazz (3×5×7)