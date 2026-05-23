/**
 * app.js
 * Bộ điều phối chính (Controller)
 * ----------------------------------
 * Chịu trách nhiệm:
 *  - Khởi động ứng dụng
 *  - Gắn tất cả sự kiện (event listeners)
 *  - Điều phối luồng: sự kiện → validate → data → ui
 *
 * THỨ TỰ LOAD FILE TRONG HTML (bắt buộc):
 *   1. data.js
 *   2. validate.js
 *   3. ui.js
 *   4. app.js  ← file này phải load SAU CÙNG
 */

/* ── Trạng thái ứng dụng ──────────────────────────────── */
let editingId      = null; // null = đang thêm mới, số = đang sửa
let deleteTargetId = null; // id công việc đang chờ xác nhận xóa

/* ── Hàm refresh giao diện sau mỗi thao tác ─────────────
   Gọi sau thêm / sửa / xóa / đổi trạng thái
   để bảng dữ liệu và thống kê luôn đồng bộ */
function refreshUI() {
  renderTasks(getAllTasks());
  updateTaskSummary(getStatistics());
}

/* ══════════════════════════════════════════════════════════
   SỰ KIỆN: MỞ FORM THÊM
   ══════════════════════════════════════════════════════════ */
document.getElementById('btn-add').addEventListener('click', () => {
  editingId = null;    // Đặt lại: đang thêm mới
  openModalAdd();
});

/* ══════════════════════════════════════════════════════════
   SỰ KIỆN: ĐÓNG FORM
   ══════════════════════════════════════════════════════════ */
document.getElementById('btn-close').addEventListener('click', closeModal);
document.getElementById('btn-cancel').addEventListener('click', closeModal);

// Đóng khi click ra ngoài vùng modal
document.getElementById('modal-backdrop').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

/* ══════════════════════════════════════════════════════════
   SỰ KIỆN: SUBMIT FORM (thêm mới hoặc cập nhật)
   ══════════════════════════════════════════════════════════ */
document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Ngăn trình duyệt reload trang

  const values   = getFormValues();              // Lấy dữ liệu từ form (ui.js)
  const taskData = validateTaskForm(values);     // Kiểm tra hợp lệ (validate.js)
  if (!taskData) return;                         // Có lỗi → dừng lại

  if (editingId !== null) {
    // ── Chế độ SỬA ──
    updateTask(editingId, taskData);             // Cập nhật trong mảng (data.js)
    showMessage(`Đã cập nhật: "${taskData.title}"`);
  } else {
    // ── Chế độ THÊM MỚI ──
    addTask(taskData);                           // Thêm vào mảng (data.js)
    showMessage(`Đã thêm: "${taskData.title}"`);
  }

  refreshUI();   // Render lại danh sách + thống kê
  closeModal();
  editingId = null;
});

/* ══════════════════════════════════════════════════════════
   SỰ KIỆN: CÁC NÚT TRONG DANH SÁCH (Event Delegation)
   ══════════════════════════════════════════════════════════
   Dùng một listener duy nhất trên #task-list thay vì
   gắn riêng từng nút → hoạt động đúng dù bảng render lại.
*/
document.getElementById('task-list').addEventListener('click', function (e) {
  // Tìm nút gần nhất có data-action từ điểm click lên
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const id     = Number(btn.dataset.id);   // Lấy id, ép sang kiểu số
  const action = btn.dataset.action;

  if (action === 'toggle') {
    // ── Đổi trạng thái hoàn thành ──
    const nowDone = toggleDone(id);        // Lật done (data.js)
    showMessage(nowDone ? 'Đã đánh dấu hoàn thành!' : 'Đã đánh dấu chưa xong.');
    refreshUI();

  } else if (action === 'edit') {
    // ── Mở form sửa ──
    const task = findTaskById(id);
    if (!task) return;
    editingId = id;                        // Ghi nhớ đang sửa công việc nào
    openModalEdit(task);                   // Điền dữ liệu cũ lên form (ui.js)

  } else if (action === 'delete') {
    // ── Mở hộp xác nhận xóa ──
    const task = findTaskById(id);
    deleteTargetId = id;
    openConfirm(task ? task.title : 'này');
  }
});

/* ══════════════════════════════════════════════════════════
   SỰ KIỆN: XÁC NHẬN XÓA
   ══════════════════════════════════════════════════════════ */
document.getElementById('confirm-yes').addEventListener('click', () => {
  const task = findTaskById(deleteTargetId);
  const ok   = deleteTask(deleteTargetId);  // Xóa trong mảng (data.js)
  if (ok) {
    showMessage(`Đã xóa: "${task ? task.title : ''}"`);
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

/* ══════════════════════════════════════════════════════════
   KHỞI ĐỘNG ỨNG DỤNG
   ══════════════════════════════════════════════════════════ */
(function init() {
  loadFromStorage();  // Đọc dữ liệu từ localStorage (data.js)
  refreshUI();        // Vẽ danh sách và thống kê lần đầu
})();