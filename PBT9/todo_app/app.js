// ============================================================
// Todo App — Vanilla JavaScript
// Kỹ thuật: createElement, Event Delegation, LocalStorage
// ============================================================

// ── Selectors ──
const form       = document.querySelector("#todoForm");
const input      = document.querySelector("#todoInput");
const list       = document.querySelector("#todoList");
const footer     = document.querySelector("#todoFooter");
const itemCount  = document.querySelector("#itemCount");
const clearBtn   = document.querySelector("#clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

// ── State ──
let todos        = loadFromStorage();
let currentFilter = "all";

// ── Khởi tạo ──
renderAll();

// ====================================================
// THÊM TODO
// ====================================================
form.addEventListener("submit", (e) => {
    e.preventDefault();            // Ngăn trang reload
    const text = input.value.trim();
    if (!text) return;

    const todo = {
        id:        Date.now(),     // ID duy nhất dùng timestamp
        text:      text,
        completed: false
    };

    todos.push(todo);
    saveToStorage();
    renderAll();

    input.value = "";
    input.focus();
});

// ====================================================
// EVENT DELEGATION — Bind 1 listener lên list thay vì từng <li>
// Xử lý: toggle, delete, double-click edit
// ====================================================
list.addEventListener("click", (e) => {
    const li   = e.target.closest(".todo-item");
    if (!li) return;
    const id   = Number(li.dataset.id);

    // Click nút xóa
    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        saveToStorage();
        renderAll();
        return;
    }

    // Click checkbox hoặc text → toggle completed
    if (e.target.classList.contains("todo-checkbox") ||
        e.target.classList.contains("todo-text")) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            saveToStorage();
            renderAll();
        }
    }
});

// Double-click để edit
list.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("todo-text")) return;
    const li  = e.target.closest(".todo-item");
    const id  = Number(li.dataset.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    // Tạo input edit
    const editInput = document.createElement("input");
    editInput.type      = "text";
    editInput.value     = todo.text;
    editInput.className = "todo-edit-input";

    // Thay thế text span bằng input
    e.target.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    // Lưu khi Enter hoặc blur
    const saveEdit = () => {
        const newText = editInput.value.trim();
        if (newText) todo.text = newText;
        saveToStorage();
        renderAll();
    };

    editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") renderAll(); // Hủy edit
    });
    editInput.addEventListener("blur", saveEdit);
});

// ====================================================
// FILTER
// ====================================================
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderAll();
    });
});

// ====================================================
// CLEAR COMPLETED
// ====================================================
clearBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveToStorage();
    renderAll();
});

// ====================================================
// RENDER
// ====================================================
function renderAll() {
    // Lọc theo filter hiện tại
    const filtered = todos.filter(todo => {
        if (currentFilter === "active")    return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    // Xóa list cũ
    list.innerHTML = "";

    if (filtered.length === 0) {
        const msg = document.createElement("li");
        msg.className   = "empty-msg";
        msg.textContent = currentFilter === "completed"
            ? "Chưa có việc nào hoàn thành 🎯"
            : "Không có việc nào! 🎉";
        list.appendChild(msg);
    } else {
        // Dùng DocumentFragment để chỉ 1 lần reflow
        const fragment = document.createDocumentFragment();
        filtered.forEach(todo => {
            fragment.appendChild(createTodoElement(todo));
        });
        list.appendChild(fragment);
    }

    // Cập nhật count và footer
    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${activeCount} việc còn lại`;
    footer.style.display  = todos.length > 0 ? "flex" : "none";
}

// Tạo DOM element cho 1 todo (dùng createElement, KHÔNG innerHTML)
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className      = `todo-item${todo.completed ? " completed" : ""}`;
    li.dataset.id     = todo.id;

    // Checkbox (hình tròn)
    const checkbox = document.createElement("span");
    checkbox.className   = "todo-checkbox";
    checkbox.textContent = todo.completed ? "✓" : "";

    // Text
    const text = document.createElement("span");
    text.className   = "todo-text";
    text.textContent = todo.text;       // textContent an toàn hơn innerHTML

    // Nút xóa
    const deleteBtn = document.createElement("button");
    deleteBtn.className   = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Xóa todo");

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    return li;
}

// ====================================================
// LOCAL STORAGE
// ====================================================
function saveToStorage() {
    localStorage.setItem("todos_pbt09", JSON.stringify(todos));
}

function loadFromStorage() {
    try {
        return JSON.parse(localStorage.getItem("todos_pbt09")) || [];
    } catch {
        return [];
    }
}