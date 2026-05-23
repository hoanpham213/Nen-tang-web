/**
 * data.js
 * Quản lý dữ liệu công việc và localStorage
 * -------------------------------------------
 * Chịu trách nhiệm:
 *  - Lưu / đọc mảng tasks từ localStorage
 *  - Các hàm CRUD: thêm, sửa, xóa, đổi trạng thái
 *  - Tính thống kê
 */

const STORAGE_KEY = 'tasks_data';

let tasks = [];

/* ── Dữ liệu mẫu khi chạy lần đầu ───────────────────── */
function sampleData() {
  return [
    {
      id: 1,
      title: 'Ôn tập môn Lập trình Web',
      desc: 'Xem lại bài DOM, sự kiện và localStorage',
      deadline: '2025-06-10',
      priority: 'cao',
      done: false,
    },
    {
      id: 2,
      title: 'Nộp bài tập nhóm',
      desc: 'Hoàn thiện phần giao diện và đẩy lên GitHub',
      deadline: '2025-06-05',
      priority: 'cao',
      done: true,
    },
    {
      id: 3,
      title: 'Đọc tài liệu JavaScript cơ bản',
      desc: 'Tập trung vào Array, Object và các hàm xử lý chuỗi',
      deadline: '2025-06-15',
      priority: 'trung binh',
      done: false,
    },
    {
      id: 4,
      title: 'Đăng ký học phần kỳ tới',
      desc: '',
      deadline: '2025-06-20',
      priority: 'thap',
      done: false,
    },
  ];
}

/* ── Đọc từ localStorage ──────────────────────────────── */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : sampleData();
  } catch (e) {
    console.error('Lỗi đọc localStorage:', e);
    tasks = sampleData();
  }
}

/* ── Lưu xuống localStorage ───────────────────────────── */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* ── Lấy toàn bộ danh sách ────────────────────────────── */
function getAllTasks() {
  return [...tasks];
}

/* ── Tìm công việc theo id ────────────────────────────── */
function findTaskById(id) {
  return tasks.find((t) => t.id === id);
}

/* ── Tạo id mới (tự tăng) ─────────────────────────────── */
function generateId() {
  if (!tasks.length) return 1;
  return Math.max(...tasks.map((t) => t.id)) + 1;
}

/* ── Thêm công việc ───────────────────────────────────── */
function addTask(taskData) {
  const newTask = {
    id: generateId(),
    ...taskData,
    done: false,
  };
  tasks.push(newTask);
  saveToStorage();
  return newTask;
}

/* ── Cập nhật công việc ───────────────────────────────── */
function updateTask(id, newData) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks[idx] = { ...tasks[idx], ...newData };
  saveToStorage();
  return true;
}

/* ── Xóa công việc ────────────────────────────────────── */
function deleteTask(id) {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length < before) {
    saveToStorage();
    return true;
  }
  return false;
}

/* ── Đổi trạng thái hoàn thành ────────────────────────── */
function toggleDone(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks[idx].done = !tasks[idx].done;
  saveToStorage();
  return tasks[idx].done;
}

/* ── Tính thống kê ────────────────────────────────────── */
function getStatistics() {
  const total = tasks.length;
  const done  = tasks.filter((t) => t.done).length;
  return {
    total,
    done,
    todo: total - done,
  };
}