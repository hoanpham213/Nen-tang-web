/**
 * validate.js
 * Kiểm tra dữ liệu form công việc
 * ---------------------------------
 * Trả về object hợp lệ hoặc null nếu có lỗi.
 * Gọi showMessage() (từ ui.js) để thông báo lỗi.
 */

/**
 * Validate form công việc
 * @param {object} values  - Raw values từ getFormValues() (ui.js)
 * @returns {object|null}  - Object công việc hợp lệ, hoặc null nếu lỗi
 */
function validateTaskForm(values) {
  const { title, deadline, priority } = values;

  // Tiêu đề bắt buộc
  if (!title || !title.trim()) {
    showMessage('Vui lòng nhập tiêu đề công việc.', 'error');
    return null;
  }

  if (title.trim().length < 3) {
    showMessage('Tiêu đề phải có ít nhất 3 ký tự.', 'error');
    return null;
  }

  // Hạn hoàn thành bắt buộc
  if (!deadline) {
    showMessage('Vui lòng chọn hạn hoàn thành.', 'error');
    return null;
  }

  // Mức ưu tiên bắt buộc
  if (!priority) {
    showMessage('Vui lòng chọn mức ưu tiên.', 'error');
    return null;
  }

  // Tất cả hợp lệ
  return {
    title:    title.trim(),
    desc:     values.desc ? values.desc.trim() : '',
    deadline: deadline,
    priority: priority,
  };
}