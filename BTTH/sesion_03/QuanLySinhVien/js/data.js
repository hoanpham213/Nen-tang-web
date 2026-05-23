/**
 * data.js
 * Quản lý dữ liệu sinh viên và localStorage
 * -------------------------------------------
 * Module này chịu trách nhiệm:
 *  - Lưu / đọc mảng students từ localStorage
 *  - Cung cấp các hàm CRUD: thêm, sửa, xóa, tìm
 *  - Tạo dữ liệu mẫu khi lần đầu khởi chạy
 */

const STORAGE_KEY = 'sinhvien_data';

// Mảng sinh viên - nguồn dữ liệu duy nhất (single source of truth)
let students = [];

/**
 * Trả về dữ liệu mẫu khi localStorage chưa có gì
 */
function sampleData() {
  return [
    {
      id: 'SV001',
      name: 'Nguyễn Văn An',
      dob: '2003-05-12',
      cls: 'CNTT01',
      gpa: 8.5,
      email: 'an.nv@email.com',
    },
    {
      id: 'SV002',
      name: 'Trần Thị Bình',
      dob: '2003-09-20',
      cls: 'CNTT01',
      gpa: 6.8,
      email: 'binh.tt@email.com',
    },
    {
      id: 'SV003',
      name: 'Lê Hoàng Cường',
      dob: '2002-11-03',
      cls: 'CNTT02',
      gpa: 4.2,
      email: 'cuong.lh@email.com',
    },
    {
      id: 'SV004',
      name: 'Phạm Thị Dung',
      dob: '2003-01-15',
      cls: 'CNTT01',
      gpa: 9.1,
      email: 'dung.pt@email.com',
    },
  ];
}

/**
 * Đọc dữ liệu từ localStorage vào biến students
 * Nếu chưa có dữ liệu → dùng sampleData()
 */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    students = raw ? JSON.parse(raw) : sampleData();
  } catch (e) {
    console.error('Lỗi đọc localStorage:', e);
    students = sampleData();
  }
}

/**
 * Lưu mảng students hiện tại xuống localStorage
 */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

/**
 * Trả về toàn bộ mảng sinh viên (bản sao để tránh sửa trực tiếp)
 */
function getAllStudents() {
  return [...students];
}

/**
 * Tìm sinh viên theo mã
 * @param {string} id - Mã sinh viên
 * @returns {object|undefined}
 */
function findStudentById(id) {
  return students.find((sv) => sv.id === id);
}

/**
 * Kiểm tra mã sinh viên đã tồn tại chưa
 * @param {string} id
 * @returns {boolean}
 */
function isIdDuplicate(id) {
  return students.some((sv) => sv.id.toLowerCase() === id.toLowerCase());
}

/**
 * Thêm sinh viên mới vào mảng và lưu xuống localStorage
 * @param {object} sv - Object sinh viên
 */
function addStudent(sv) {
  students.push(sv);
  saveToStorage();
}

/**
 * Cập nhật thông tin sinh viên đã có
 * @param {string} id - Mã sinh viên cần cập nhật
 * @param {object} newData - Dữ liệu mới
 * @returns {boolean} - true nếu tìm thấy và cập nhật được
 */
function updateStudent(id, newData) {
  const idx = students.findIndex((sv) => sv.id === id);
  if (idx === -1) return false;
  students[idx] = { ...students[idx], ...newData };
  saveToStorage();
  return true;
}

/**
 * Xóa sinh viên khỏi mảng
 * @param {string} id - Mã sinh viên cần xóa
 * @returns {boolean} - true nếu xóa thành công
 */
function deleteStudent(id) {
  const before = students.length;
  students = students.filter((sv) => sv.id !== id);
  if (students.length < before) {
    saveToStorage();
    return true;
  }
  return false;
}

/**
 * Tính các chỉ số thống kê
 * @returns {{ total, avg, excellent, weak }}
 */
function getStatistics() {
  const total = students.length;
  const avg = total
    ? students.reduce((sum, sv) => sum + sv.gpa, 0) / total
    : 0;
  const excellent = students.filter((sv) => sv.gpa >= 8.5).length;
  const weak = students.filter((sv) => sv.gpa < 5.0).length;
  return { total, avg, excellent, weak };
}