// ============================================================
// guess.js — Logic game đoán số
// ============================================================

const MAX_ATTEMPTS = 7;

let secretNumber;
let attempts;
let guessedNumbers;   // Lưu các số đã đoán để cảnh báo trùng
let gameOver;

// Khởi tạo game mới
function initGame() {
    secretNumber  = Math.floor(Math.random() * 100) + 1; // 1–100
    attempts      = 0;
    guessedNumbers = [];
    gameOver      = false;

    // Reset UI
    document.getElementById("hintBox").className    = "hint-box";
    document.getElementById("hintBox").textContent  = "Hãy nhập số đầu tiên của bạn!";
    document.getElementById("attemptCount").textContent = "0";
    document.getElementById("warning").textContent  = "";
    document.getElementById("history").innerHTML    = "";
    document.getElementById("guessInput").value     = "";
    document.getElementById("guessInput").disabled  = false;
    document.getElementById("guessBtn").disabled    = false;
    document.getElementById("progressFill").style.width = "0%";
}

// Xử lý khi user nhấn Đoán
function makeGuess() {
    if (gameOver) return;

    const input = document.getElementById("guessInput");
    const guess = parseInt(input.value);
    const warning = document.getElementById("warning");

    // Validate: phải là số nguyên trong 1–100
    if (isNaN(guess) || guess < 1 || guess > 100) {
        warning.textContent = "⚠️ Vui lòng nhập số nguyên từ 1 đến 100!";
        input.value = "";
        return;
    }

    // Kiểm tra số đã đoán rồi chưa
    if (guessedNumbers.includes(guess)) {
        warning.textContent = `⚠️ Bạn đã đoán số ${guess} rồi! Hãy thử số khác.`;
        input.value = "";
        return;
    }

    // Xóa cảnh báo, ghi nhận lần đoán
    warning.textContent = "";
    guessedNumbers.push(guess);
    attempts++;

    // Cập nhật UI lần đoán + progress bar
    document.getElementById("attemptCount").textContent = attempts;
    document.getElementById("progressFill").style.width =
        (attempts / MAX_ATTEMPTS * 100) + "%";

    // Thêm vào lịch sử
    addHistory(guess);

    const hintBox = document.getElementById("hintBox");

    // Kiểm tra kết quả
    if (guess === secretNumber) {
        // THẮNG
        hintBox.className = "hint-box win";
        hintBox.textContent = `🎉 Đúng rồi! Số bí ẩn là ${secretNumber}. Bạn đoán đúng sau ${attempts} lần!`;
        endGame();

    } else if (attempts >= MAX_ATTEMPTS) {
        // HẾT LƯỢT — THUA
        hintBox.className = "hint-box lose";
        hintBox.textContent = `😢 Hết lượt! Số bí ẩn là ${secretNumber}. Chúc may mắn lần sau!`;
        endGame();

    } else if (guess < secretNumber) {
        // GỢI Ý: cao hơn
        hintBox.className = "hint-box higher";
        hintBox.textContent = `📈 Cao hơn! (còn ${MAX_ATTEMPTS - attempts} lần)`;

    } else {
        // GỢI Ý: thấp hơn
        hintBox.className = "hint-box lower";
        hintBox.textContent = `📉 Thấp hơn! (còn ${MAX_ATTEMPTS - attempts} lần)`;
    }

    input.value = "";
    input.focus();
}

// Thêm dòng vào lịch sử
function addHistory(guess) {
    const history = document.getElementById("history");
    const icon = guess === secretNumber ? "✅" :
                 guess <  secretNumber ? "⬆️" : "⬇️";
    const div = document.createElement("div");
    div.className = "history-item";
    div.textContent = `${icon} Lần ${attempts}: đoán ${guess}`;
    history.appendChild(div);
    history.scrollTop = history.scrollHeight;
}

// Kết thúc game
function endGame() {
    gameOver = true;
    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessBtn").disabled   = true;
}

// Reset game
function resetGame() {
    initGame();
    document.getElementById("guessInput").focus();
}

// Cho phép nhấn Enter để đoán
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") makeGuess();
});

// Khởi động game khi load trang
initGame();