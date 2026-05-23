/**
 * validate.js
 * Kiểm tra tính hợp lệ của dữ liệu form
 * ---------------------------------------
 * Module này chịu trách nhiệm:
 *  - Validate từng trường dữ liệu
 *  - Trả về object hợp lệ hoặc null nếu có lỗi
 *  - Hiển thị thông báo lỗi qua showNotify() của ui.js
 *
 * Tách riêng validate giúp dễ thêm/bớt rule sau này
 * mà không cần đụng vào logic xử lý sự kiện.
 */

/**
 * Validate và parse dữ liệu form
 *
 * @param {object} values   - Raw values lấy từ getFormValues() (ui.js)
 * @param {boolean} isEdit  - true nếu đang ở chế độ sửa
 * @param {Function} isDup  - Hàm kiểm tra mã trùng (từ data.js)
 * @returns {object|null}   - Object sinh viên hợp lệ, hoặc null nếu lỗi
 */
function validateForm(values, isEdit, isDup) {
  const { id, name, cls, gpa: gpaRaw, email } = values;

  // --- Mã sinh viên ---
  if (!id) {
    showNotify('Vui lòng nhập mã sinh viên.', 'error');
    return null;
  }
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    showNotify('Mã sinh viên chỉ được chứa chữ, số, gạch dưới, gạch ngang.', 'error');
    return null;
  }
  if (!isEdit && isDup(id)) {
    showNotify('Mã sinh viên đã tồn tại! Vui lòng dùng mã khác.', 'error');
    return null;
  }

  // --- Họ và tên ---
  if (!name) {
    showNotify('Vui lòng nhập họ và tên.', 'error');
    return null;
  }
  if (name.length < 2) {
    showNotify('Họ và tên phải có ít nhất 2 ký tự.', 'error');
    return null;
  }

  // --- Lớp học ---
  if (!cls) {
    showNotify('Vui lòng nhập lớp học.', 'error');
    return null;
  }

  // --- Điểm trung bình ---
  const gpa = parseFloat(gpaRaw);
  if (gpaRaw === '' || isNaN(gpa) || gpa < 0 || gpa > 10) {
    showNotify('Điểm trung bình phải là số từ 0 đến 10.', 'error');
    return null;
  }

  // --- Email (không bắt buộc, nhưng nếu nhập phải đúng định dạng) ---
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showNotify('Email không đúng định dạng.', 'error');
    return null;
  }

  // Tất cả hợp lệ → trả về object sinh viên chuẩn
  return {
    id,
    name,
    dob:   values.dob || '',
    cls,
    gpa:   Math.round(gpa * 100) / 100, // Làm tròn 2 chữ số thập phân
    email: email || '',
  };
}