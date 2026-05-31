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

