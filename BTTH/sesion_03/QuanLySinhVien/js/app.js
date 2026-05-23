/**
 * app.js
 * Bộ điều phối chính (Controller)
 * ----------------------------------
 * Module này chịu trách nhiệm:
 *  - Khởi động ứng dụng
 *  - Gắn tất cả sự kiện (event listeners)
 *  - Điều phối luồng: sự kiện → validate → data → ui
 *
 * Nguyên tắc: app.js không tự tính toán hay vẽ giao diện.
 * Nó chỉ gọi đúng hàm ở đúng thời điểm.
 *
 * THỨ TỰ LOAD FILE TRONG HTML:
 *   1. data.js      (dữ liệu)
 *   2. validate.js  (kiểm tra)
 *   3. ui.js        (giao diện)
 *   4. app.js       (điều phối) ← file này phải load SAU CÙNG
 */

// ─── Trạng thái ứng dụng ───────────────────────────────────────────────────
// Biến lưu mã sinh viên đang được sửa (null = đang thêm mới)
let editingId = null;

// Biến lưu mã sinh viên đang chờ xác nhận xóa
let deleteTargetId = null;

// ─── Hàm tiện ích: Refresh toàn bộ giao diện ──────────────────────────────

/**
 * Gọi sau mỗi thao tác thêm / sửa / xóa
 * để đồng bộ bảng dữ liệu và thống kê với mảng students
 */
function refreshUI() {
  renderStudents(getAllStudents());
  updateStatistics(getStatistics());
}

// ─── Xử lý sự kiện: MỞ FORM THÊM ─────────────────────────────────────────
document.getElementById('btn-add').addEventListener('click', () => {
  editingId = null; // Đặt lại trạng thái: đang thêm mới
  openModalAdd();
});

// ─── Xử lý sự kiện: ĐÓNG FORM ─────────────────────────────────────────────
document.getElementById('btn-close').addEventListener('click', closeModal);
document.getElementById('btn-cancel').addEventListener('click', closeModal);

// Đóng modal khi click ra ngoài vùng form
document.getElementById('modal-backdrop').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// ─── Xử lý sự kiện: SUBMIT FORM (thêm mới hoặc cập nhật) ─────────────────
document.getElementById('sv-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Ngăn trang tải lại

  const values = getFormValues(); // Lấy raw data từ form (ui.js)
  const isEdit = editingId !== null;

  // Validate: truyền hàm kiểm tra trùng từ data.js vào validate.js
  const svData = validateForm(values, isEdit, isIdDuplicate);
  if (!svData) return; // Nếu lỗi, validateForm đã gọi showNotify(), dừng lại

  if (isEdit) {
    // ── Chế độ SỬA ──
    updateStudent(editingId, svData);
    showNotify(`Đã cập nhật sinh viên ${svData.name}.`);
  } else {
    // ── Chế độ THÊM MỚI ──
    addStudent(svData);
    showNotify(`Đã thêm sinh viên ${svData.name}.`);
  }

  refreshUI();
  closeModal();
  editingId = null;
});

// ─── Xử lý sự kiện: NÚT SỬA và NÚT XÓA trong bảng ───────────────────────
// Dùng Event Delegation: gắn 1 listener lên tbody thay vì từng nút
// → Hoạt động đúng ngay cả khi bảng được render lại
document.getElementById('tbody').addEventListener('click', function (e) {
  // Tìm nút gần nhất có data-action từ điểm click lên
  const btn = e.target.closest('button[data-action]');
  if (!btn) return; // Click không trúng nút → bỏ qua

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  if (action === 'edit') {
    const sv = findStudentById(id);
    if (!sv) return;
    editingId = sv.id; // Ghi nhớ đang sửa sinh viên nào
    openModalEdit(sv); // Điền dữ liệu cũ lên form (ui.js)

  } else if (action === 'delete') {
    deleteTargetId = id;
    const sv = findStudentById(id);
    openConfirm(sv ? sv.name : 'sinh viên này', id); // Mở hộp xác nhận (ui.js)
  }
});

// ─── Xử lý sự kiện: XÁC NHẬN XÓA ─────────────────────────────────────────
document.getElementById('confirm-yes').addEventListener('click', () => {
  const sv = findStudentById(deleteTargetId);
  const ok = deleteStudent(deleteTargetId); // Xóa trong mảng và localStorage (data.js)
  if (ok) {
    showNotify(`Đã xóa sinh viên ${sv ? sv.name : ''}.`);
    refreshUI();
  }
  closeConfirm();
  deleteTargetId = null;
});

document.getElementById('confirm-no').addEventListener('click', () => {
  closeConfirm();
  deleteTargetId = null;
});

// Đóng confirm khi click ra ngoài
document.getElementById('confirm-backdrop').addEventListener('click', function (e) {
  if (e.target === this) {
    closeConfirm();
    deleteTargetId = null;
  }
});

// ─── Khởi động ứng dụng ───────────────────────────────────────────────────
(function init() {
  loadFromStorage(); // Đọc dữ liệu từ localStorage (data.js)
  refreshUI();       // Vẽ bảng và thống kê lần đầu
})();