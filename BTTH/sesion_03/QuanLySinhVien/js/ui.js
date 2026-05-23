/**
 * ui.js
 * Render giao diện và cập nhật DOM
 * ---------------------------------
 * Module này chịu trách nhiệm:
 *  - Vẽ bảng danh sách sinh viên
 *  - Cập nhật khu vực thống kê
 *  - Hiển thị thông báo (notify)
 *  - Mở / đóng modal form và hộp xác nhận
 *  - Điền / xóa dữ liệu trên form
 *
 * KHÔNG xử lý logic nghiệp vụ ở đây.
 * Mọi thao tác với dữ liệu nằm trong data.js.
 */

// ─── Tham chiếu đến các phần tử DOM ────────────────────────────────────────
const tbody          = document.getElementById('tbody');
const notifyEl       = document.getElementById('notify');
const statTotal      = document.getElementById('stat-total');
const statAvg        = document.getElementById('stat-avg');
const statExcellent  = document.getElementById('stat-excellent');
const statWeak       = document.getElementById('stat-weak');
const modalBackdrop  = document.getElementById('modal-backdrop');
const modalTitleText = document.getElementById('modal-title-text');
const confirmBackdrop = document.getElementById('confirm-backdrop');
const confirmMsg     = document.getElementById('confirm-msg');
const btnSubmit      = document.getElementById('btn-submit');

// Input fields trong form
const fId    = document.getElementById('f-id');
const fName  = document.getElementById('f-name');
const fDob   = document.getElementById('f-dob');
const fClass = document.getElementById('f-class');
const fGpa   = document.getElementById('f-gpa');
const fEmail = document.getElementById('f-email');

let notifyTimer = null;

// ─── Bảng danh sách ────────────────────────────────────────────────────────

/**
 * Trả về class CSS và nhãn xếp loại theo điểm
 * @param {number} gpa
 * @returns {[string, string]}
 */
function getGpaClass(gpa) {
  if (gpa >= 8.5) return ['badge-green', 'Xuất sắc'];
  if (gpa >= 7.0) return ['badge-green', 'Giỏi'];
  if (gpa >= 5.5) return ['badge-amber', 'Trung bình'];
  return ['badge-red', 'Yếu'];
}

/**
 * Render toàn bộ danh sách sinh viên ra bảng HTML
 * Gọi hàm này mỗi khi dữ liệu thay đổi (thêm / sửa / xóa)
 * @param {Array} students - Mảng sinh viên
 */
function renderStudents(students) {
  if (!students.length) {
    tbody.innerHTML = `
      <tr class="empty-row">
        <td colspan="7">
          <i class="ti ti-inbox" aria-hidden="true"></i>
          Chưa có sinh viên nào. Bấm "Thêm sinh viên" để bắt đầu.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = students
    .map((sv) => {
      const [cls, label] = getGpaClass(sv.gpa);
      const dob = sv.dob
        ? new Date(sv.dob).toLocaleDateString('vi-VN')
        : '—';

      return `
        <tr data-id="${sv.id}">
          <td>
            <code class="code-badge">${sv.id}</code>
          </td>
          <td class="fw-500">${sv.name}</td>
          <td>${dob}</td>
          <td>${sv.cls}</td>
          <td>
            <span class="badge ${cls}">
              ${sv.gpa.toFixed(1)} — ${label}
            </span>
          </td>
          <td class="text-muted text-sm">${sv.email || '—'}</td>
          <td class="actions-cell">
            <button
              class="btn btn-sm btn-edit"
              data-action="edit"
              data-id="${sv.id}"
              title="Sửa thông tin"
              aria-label="Sửa ${sv.name}">
              <i class="ti ti-edit" aria-hidden="true"></i>
            </button>
            <button
              class="btn btn-sm btn-danger"
              data-action="delete"
              data-id="${sv.id}"
              title="Xóa sinh viên"
              aria-label="Xóa ${sv.name}">
              <i class="ti ti-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>`;
    })
    .join('');
}

// ─── Thống kê ───────────────────────────────────────────────────────────────

/**
 * Cập nhật 4 ô thống kê ở đầu trang
 * @param {{ total, avg, excellent, weak }} stats
 */
function updateStatistics(stats) {
  statTotal.textContent     = stats.total;
  statAvg.textContent       = stats.avg.toFixed(2);
  statExcellent.textContent = stats.excellent;
  statWeak.textContent      = stats.weak;
}

// ─── Thông báo ──────────────────────────────────────────────────────────────

/**
 * Hiển thị thông báo phía trên bảng, tự động ẩn sau 3.5 giây
 * @param {string} msg   - Nội dung thông báo
 * @param {'success'|'error'} type
 */
function showNotify(msg, type = 'success') {
  notifyEl.textContent = msg;
  notifyEl.className   = 'notify ' + type;
  clearTimeout(notifyTimer);
  notifyTimer = setTimeout(() => {
    notifyEl.className = 'notify';
  }, 3500);
}

// ─── Modal form ─────────────────────────────────────────────────────────────

/**
 * Mở modal ở chế độ THÊM MỚI: xóa form, đổi tiêu đề
 */
function openModalAdd() {
  resetForm();
  modalTitleText.textContent = 'Thêm sinh viên';
  btnSubmit.innerHTML =
    '<i class="ti ti-device-floppy" aria-hidden="true"></i> Lưu';
  fId.disabled = false;
  modalBackdrop.classList.add('open');
  setTimeout(() => fId.focus(), 100);
}

/**
 * Mở modal ở chế độ SỬA: điền dữ liệu cũ vào form
 * @param {object} sv - Đối tượng sinh viên cần sửa
 */
function openModalEdit(sv) {
  resetForm();
  modalTitleText.textContent = 'Cập nhật sinh viên';
  btnSubmit.innerHTML =
    '<i class="ti ti-device-floppy" aria-hidden="true"></i> Cập nhật';

  // Điền dữ liệu hiện tại lên form
  fId.value    = sv.id;
  fId.disabled = true; // Không cho đổi mã khi sửa
  fName.value  = sv.name;
  fDob.value   = sv.dob || '';
  fClass.value = sv.cls;
  fGpa.value   = sv.gpa;
  fEmail.value = sv.email || '';

  modalBackdrop.classList.add('open');
  setTimeout(() => fName.focus(), 100);
}

/**
 * Đóng modal và reset trạng thái
 */
function closeModal() {
  modalBackdrop.classList.remove('open');
  fId.disabled = false;
}

/**
 * Xóa toàn bộ dữ liệu trên form về trạng thái ban đầu
 */
function resetForm() {
  document.getElementById('sv-form').reset();
  fId.disabled = false;
}

/**
 * Lấy dữ liệu từ các input của form
 * @returns {object} - Raw values (chưa validate)
 */
function getFormValues() {
  return {
    id:    fId.value.trim(),
    name:  fName.value.trim(),
    dob:   fDob.value,
    cls:   fClass.value.trim(),
    gpa:   fGpa.value.trim(),
    email: fEmail.value.trim(),
  };
}

// ─── Hộp xác nhận xóa ───────────────────────────────────────────────────────

/**
 * Mở hộp xác nhận xóa với tên sinh viên cụ thể
 * @param {string} name - Tên sinh viên
 * @param {string} id   - Mã sinh viên
 */
function openConfirm(name, id) {
  confirmMsg.textContent = `Xóa sinh viên "${name}" (${id})? Hành động này không thể hoàn tác.`;
  confirmBackdrop.classList.add('open');
}

/**
 * Đóng hộp xác nhận
 */
function closeConfirm() {
  confirmBackdrop.classList.remove('open');
}