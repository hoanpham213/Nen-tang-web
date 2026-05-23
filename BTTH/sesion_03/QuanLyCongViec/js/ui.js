/**
 * ui.js
 * Render giao diện và cập nhật DOM
 * ----------------------------------
 * Chịu trách nhiệm:
 *  - Vẽ danh sách card công việc
 *  - Cập nhật thống kê
 *  - Hiển thị / ẩn thông báo
 *  - Mở / đóng modal form và hộp xác nhận
 *  - Điền / xóa dữ liệu trên form
 *
 * KHÔNG xử lý logic nghiệp vụ ở đây.
 */

/* ── Tham chiếu DOM ───────────────────────────────────── */
const taskList       = document.getElementById('task-list');
const messageEl      = document.getElementById('message');
const statTotal      = document.getElementById('stat-total');
const statDone       = document.getElementById('stat-done');
const statTodo       = document.getElementById('stat-todo');
const modalBackdrop  = document.getElementById('modal-backdrop');
const modalTitleText = document.getElementById('modal-title-text');
const confirmBackdrop = document.getElementById('confirm-backdrop');
const confirmMsg     = document.getElementById('confirm-msg');
const btnSubmit      = document.getElementById('btn-submit');

// Các input trong form
const fTitle    = document.getElementById('f-title');
const fDesc     = document.getElementById('f-desc');
const fDeadline = document.getElementById('f-deadline');
const fPriority = document.getElementById('f-priority');

let messageTimer = null;

/* ══════════════════════════════════════════════════════════
   RENDER DANH SÁCH CÔNG VIỆC
   ══════════════════════════════════════════════════════════ */

/**
 * Trả về nhãn và class CSS theo mức ưu tiên
 */
function getPriorityInfo(priority) {
  switch (priority) {
    case 'cao':       return { label: 'Cao',        cls: 'priority-high' };
    case 'trung binh': return { label: 'Trung bình', cls: 'priority-medium' };
    case 'thap':      return { label: 'Thấp',       cls: 'priority-low' };
    default:          return { label: priority,     cls: '' };
  }
}

/**
 * Render toàn bộ danh sách công việc dưới dạng card.
 * Gọi hàm này mỗi khi dữ liệu thay đổi.
 * @param {Array} tasks - Mảng công việc
 */
function renderTasks(tasks) {
  // Trường hợp chưa có công việc nào
  if (!tasks.length) {
    taskList.innerHTML = `
      <div class="empty-state">
        <p>Chưa có công việc nào.</p>
        <p>Bấm <strong>"Thêm công việc"</strong> để bắt đầu!</p>
      </div>`;
    return;
  }

  // Tạo HTML cho từng card
  taskList.innerHTML = tasks.map((task) => {
    const { label, cls } = getPriorityInfo(task.priority);

    // Format ngày deadline sang dạng dd/mm/yyyy
    const deadline = task.deadline
      ? new Date(task.deadline).toLocaleDateString('vi-VN')
      : '—';

    // Nếu đã hoàn thành: thêm class "done" để CSS gạch ngang tiêu đề
    const doneClass    = task.done ? 'task-card done' : 'task-card';
    const checkLabel   = task.done ? 'Hoàn thành ✓' : 'Chưa xong';
    const checkBtnCls  = task.done ? 'btn-check checked' : 'btn-check';

    return `
      <div class="${doneClass}" data-id="${task.id}">

        <div class="card-header">
          <span class="task-title">${task.title}</span>
          <span class="priority-badge ${cls}">${label}</span>
        </div>

        ${task.desc
          ? `<p class="task-desc">${task.desc}</p>`
          : ''}

        <div class="card-footer">
          <span class="task-deadline">
            Hạn: <strong>${deadline}</strong>
          </span>

          <div class="card-actions">
            <!-- Nút đổi trạng thái -->
            <button class="${checkBtnCls}"
              data-action="toggle"
              data-id="${task.id}"
              title="${task.done ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}">
              ${checkLabel}
            </button>

            <!-- Nút sửa -->
            <button class="btn btn-sm btn-edit"
              data-action="edit"
              data-id="${task.id}"
              title="Sửa công việc">
              Sửa
            </button>

            <!-- Nút xóa -->
            <button class="btn btn-sm btn-delete"
              data-action="delete"
              data-id="${task.id}"
              title="Xóa công việc">
              Xóa
            </button>
          </div>
        </div>

      </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   THỐNG KÊ
   ══════════════════════════════════════════════════════════ */

/**
 * Cập nhật 3 ô thống kê
 * @param {{ total, done, todo }} stats
 */
function updateTaskSummary(stats) {
  statTotal.textContent = stats.total;
  statDone.textContent  = stats.done;
  statTodo.textContent  = stats.todo;
}

/* ══════════════════════════════════════════════════════════
   THÔNG BÁO
   ══════════════════════════════════════════════════════════ */

/**
 * Hiển thị thông báo, tự ẩn sau 3 giây
 * @param {string} msg
 * @param {'success'|'error'} type
 */
function showMessage(msg, type = 'success') {
  messageEl.textContent = msg;
  messageEl.className   = 'message ' + type;
  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => {
    messageEl.className = 'message';
  }, 3000);
}

/* ══════════════════════════════════════════════════════════
   MODAL FORM
   ══════════════════════════════════════════════════════════ */

/**
 * Mở modal ở chế độ THÊM MỚI
 */
function openModalAdd() {
  resetForm();
  modalTitleText.textContent = 'Thêm công việc';
  btnSubmit.textContent      = 'Lưu';
  modalBackdrop.classList.add('open');
  setTimeout(() => fTitle.focus(), 100);
}

/**
 * Mở modal ở chế độ SỬA — điền dữ liệu cũ vào form
 * @param {object} task
 */
function openModalEdit(task) {
  resetForm();
  modalTitleText.textContent = 'Sửa công việc';
  btnSubmit.textContent      = 'Cập nhật';

  // Đưa dữ liệu hiện tại lên form
  fTitle.value    = task.title;
  fDesc.value     = task.desc || '';
  fDeadline.value = task.deadline || '';
  fPriority.value = task.priority;

  modalBackdrop.classList.add('open');
  setTimeout(() => fTitle.focus(), 100);
}

/**
 * Đóng modal
 */
function closeModal() {
  modalBackdrop.classList.remove('open');
}

/**
 * Xóa toàn bộ dữ liệu trên form
 */
function resetForm() {
  document.getElementById('task-form').reset();
}

/**
 * Lấy raw values từ form (chưa validate)
 */
function getFormValues() {
  return {
    title:    fTitle.value,
    desc:     fDesc.value,
    deadline: fDeadline.value,
    priority: fPriority.value,
  };
}

/* ══════════════════════════════════════════════════════════
   HỘP XÁC NHẬN XÓA
   ══════════════════════════════════════════════════════════ */

/**
 * Mở hộp xác nhận với tên công việc
 * @param {string} title
 */
function openConfirm(title) {
  confirmMsg.textContent = `Xóa công việc "${title}"? Hành động này không thể hoàn tác.`;
  confirmBackdrop.classList.add('open');
}

/**
 * Đóng hộp xác nhận
 */
function closeConfirm() {
  confirmBackdrop.classList.remove('open');
}