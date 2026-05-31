// ============================================================
// higher_order.js — Higher-Order Functions
// Chạy: node higher_order.js
// ============================================================

// ── 1. pipe() — Nối chuỗi functions ──
// Nhận nhiều hàm, trả về hàm mới áp dụng lần lượt từ trái sang phải
function pipe(...fns) {
    return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

console.log("===== 1. pipe() =====");
const process = pipe(
    x => x * 2,            // 5  → 10
    x => x + 10,           // 10 → 20
    x => x.toString(),     // 20 → "20"
    x => "Kết quả: " + x   // → "Kết quả: 20"
);
console.log(process(5));   // → "Kết quả: 20"
console.log(process(10));  // → "Kết quả: 30"

// ── 2. memoize() — Cache kết quả ──
// Lưu kết quả đã tính vào cache, lần sau dùng lại không tính lại
function memoize(fn) {
    const cache = {};   // object lưu cache theo key = JSON.stringify(args)
    return function(...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            console.log(`(cache hit: ${key})`);
            return cache[key];
        }
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

console.log("\n===== 2. memoize() =====");
const expensiveCalc = memoize((n) => {
    console.log(`Đang tính sum(0..${n})...`);
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000));  // Tính lần 1 — in "Đang tính..."
console.log(expensiveCalc(1000000));  // Lần 2 — lấy cache, không tính lại
console.log(expensiveCalc(500));      // Tham số khác → tính lần đầu
console.log(expensiveCalc(500));      // Cache hit

// ── 3. debounce() — Chờ user ngừng gõ mới thực hiện ──
// Nếu fn được gọi liên tục, chỉ lần cuối (sau khi ngừng delay ms) mới chạy
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);  // Hủy timer cũ nếu còn đang chờ
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

console.log("\n===== 3. debounce() =====");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Gọi liên tục 4 lần, chỉ lần cuối chạy sau 500ms
search("i");
search("ip");
search("iph");
search("ipho");
search("iphone");  // ← chỉ cái này chạy sau 500ms

// Chờ để thấy kết quả
setTimeout(() => {
    console.log("(chỉ 'iphone' được search, các lần trước bị debounce)");
}, 600);

// ── 4. retry() — Thử lại nếu lỗi ──
// Gọi fn tối đa maxAttempts lần, nếu vẫn lỗi → throw
async function retry(fn, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const result = await fn();
            console.log(`✅ Thành công ở lần ${attempt}`);
            return result;
        } catch (err) {
            lastError = err;
            console.log(`❌ Lần ${attempt} thất bại: ${err.message}`);
            if (attempt < maxAttempts) {
                console.log(`   Thử lại...`);
            }
        }
    }
    throw new Error(`Hết ${maxAttempts} lần thử. Lỗi cuối: ${lastError.message}`);
}

console.log("\n===== 4. retry() =====");

// Giả lập hàm thất bại 2 lần rồi thành công lần 3
let callCount = 0;
const unstableAPI = () => {
    callCount++;
    return new Promise((resolve, reject) => {
        if (callCount < 3) {
            reject(new Error(`Server lỗi (lần ${callCount})`));
        } else {
            resolve("Dữ liệu từ API");
        }
    });
};

retry(unstableAPI, 3)
    .then(data => console.log("Kết quả:", data))
    .catch(err => console.log("Thất bại hoàn toàn:", err.message));