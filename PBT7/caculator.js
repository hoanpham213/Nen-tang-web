// ============================================================
// calculator.js — Máy tính đơn giản
// Chạy: node calculator.js
// ============================================================

function calculate(num1, operator, num2) {
    // Kiểm tra input có phải số không
    if (typeof num1 !== "number" || isNaN(num1)) {
        return `Lỗi: Input không phải số`;
    }
    if (typeof num2 !== "number" || isNaN(num2)) {
        return `Lỗi: Input không phải số`;
    }

    // Kiểm tra operator hợp lệ
    const validOperators = ["+", "-", "*", "/", "%", "**"];
    if (!validOperators.includes(operator)) {
        return `Lỗi: Operator '${operator}' không hợp lệ`;
    }

    // Kiểm tra chia cho 0
    if ((operator === "/" || operator === "%") && num2 === 0) {
        return `Lỗi: Không thể chia cho 0`;
    }

    // Thực hiện phép tính
    switch (operator) {
        case "+":  return num1 + num2;
        case "-":  return num1 - num2;
        case "*":  return num1 * num2;
        case "/":  return num1 / num2;
        case "%":  return num1 % num2;
        case "**": return num1 ** num2;
    }
}

// ===== TEST =====
console.log("===== Kiểm tra calculate() =====");
console.log(calculate(10, "+", 5));      // → 15
console.log(calculate(10, "-", 3));      // → 7
console.log(calculate(10, "*", 4));      // → 40
console.log(calculate(10, "/", 4));      // → 2.5
console.log(calculate(10, "%", 3));      // → 1
console.log(calculate(2,  "**", 10));    // → 1024

console.log("\n===== Kiểm tra edge cases =====");
console.log(calculate(10, "/", 0));      // → Lỗi: Không thể chia cho 0
console.log(calculate(10, "%", 0));      // → Lỗi: Không thể chia cho 0
console.log(calculate(10, "^", 5));      // → Lỗi: Operator '^' không hợp lệ
console.log(calculate("abc", "+", 5));   // → Lỗi: Input không phải số
console.log(calculate(5, "+", "xyz"));   // → Lỗi: Input không phải số
console.log(calculate(10, "?", 5));      // → Lỗi: Operator '?' không hợp lệ