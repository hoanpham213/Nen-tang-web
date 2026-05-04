Phần A
Câu A1: Input Types
10 input types:
type="text" -> Ô nhập văn bản cơ bản -> Dùng cho nhập Họ tên hoặc Địa chỉ.
type="email" -> Ô nhập văn bản, tự kiểm tra định dạng có @ -> Dùng cho form Đăng ý/Đăng nhập.
type="password" -> Ô nhập ẩn ký tự -> Dùng cho ô nhập Mật khẩu.
type="number" -> Ô nhập số, có nút tăng/giảm -> Dùng để chọn Số lượng sản phẩm.
type="tel" -> Ô nhập chuyên dụng cho số điện thoại -> Dùng cho form đặt hàng.
type="date" -> Hiển thị bảng chọn lịch (ngày/tháng/năm) -> Dùng chọn Ngày giao hàng.
type="checkbox" -> Ô tích chọn (chọn được nhiều mục) -> Dùng cho Bộ lọc thuộc tính.
type="radio" -> Nút tròn chọn 1 trong nhiều lựa chọn -> Dùng chọn Phương thức thanh toán.
type="range" -> Thanh trượt chọn giá trị trong khoảng -> Dùng cho Bộ lọc khoảng giá.
type="search" -> Ô nhập text có nút "x" để xóa nhanh -> Dùng cho Thanh tìm kiếm sản phẩm.

Câu A2: Validation Attributes
Cả 5 trường hợp đều bị chặn lại và thông báo lỗi vì:
- Trường hợp 1: Thuộc tính required bắt buộc người dùng không được để trống ô nhập liệu.
- Trường hợp 2: type="email" yêu cầu nội dung phải có định dạng @, mà "abc" chỉ là văn bản thường.
- Trường hợp 3: Giá trị nhập vào là "15", vượt quá giới hạn tối đa cho phép là max="10".
- Trường hợp 4: Thuộc tính pattern="[0-9]{10}" yêu cầu người dùng phải nhập đúng 10 sô, mà "abc123" chứa ký tự chữ và không đủ độ dài.
- Trường hợp 5: Thuộc tính minlength="8" yêu cầu tối thiểu 8 ký tự, nhưng người dùng chỉ mới nhập 3 ký tự ("123")

Câu A3: Accessibility
<label for="email"> quan trọng cho người dùng screen reader vì:

Nó tạo liên kết trực tiếp giữa nhãn văn bản và ô nhập văn bản. Khi người dùng tab vào ô input, screen reader sẽ đọc nội dung trong thẻ label tương ứng lên. Nếu không có for, người dùng khiếm thi sẽ không biết ô đó dùng để nhập thông tin gì.
Dùng <fieldset> + <legend> khi:

Để nhóm các thẻ input có liên quan mật thiết với nhau trong một form lớn để tạo sự rõ ràng về cấu trúc.
Ví dụ: nhóm các lựa chọn trong phần "Phương thức thanh toán" hoặc "Địa chỉ nhận hàng".
Dùng aria-label khi:

Một phần tử không có văn bản hiển thị trên màn hình nhưng vẫn cần một cái tên để screen reader đọc lên.
Không nên dùng khi có <label> vì nếu có cả hai, screen reader có thể bị ưu tiên đọc aria-label và bỏ qua <label> thực, hoặc đọc lặp lại cả hai gây nhiễu thông tin.
Câu A4: Media
Thuộc tính loading="lazy" trên thẻ <img>:

Đây là kỹ thuật "tải chậm". Trình duyệt sẽ trì hoãn việc tải ảnh cho đến khi người dùng cuộn trang đến gần vị trí tấm ảnh đó.
Giúp trang web tải nhanh hơn ở lần đầu, tiết kiệm băng thông cho người dùng.
không dùng cho những ảnh nằm ở ngay đầu trang vì sẽ làm chậm việc hiển thị nội dung chính.
Nên cung cấp nhiều <source> trong thẻ <video> vì:

Để đảm bảo tính tương thích. Mỗi trình duyệt hỗ trợ các định dạng video khác nhau. Nếu định dạng đầu tiên không chạy được, trình duyệt sẽ tự động thử định dạng tiếp theo.
3 format video web phổ biến:
.mp4 (Phổ biến nhất, hỗ trợ mọi trình duyệt.)
.webm (Chất lượng cao, dung lượng nhẹ.)
.ogg (Định dạng mã nguồn mở.)
Thuộc tính alt trên <img> dùng để:

Để mô tả nội dung hình ảnh bằng văn bản. Hiển thị khi ảnh bị lỗi không tải được và giúp trình đọc màn hình hỗ trợ người khiếm thị.
alt tốt cho 3 trường hợp:
Ảnh sản phẩm iPhone 16: alt="Điện thoại iPhone 16 Pro Max màu Titan siêu đẹp".
Ảnh trang trí (decorative): alt=""(Để trống để trình đọc màn hình bỏ qua không gây nhiễu cho người dùng).
Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ thể hiện doanh thu tăng trưởng trong quý 1 năm 2026".
Câu A5: So sánh <figure> vs <img> :
Dùng cách 1 (<img>) khi:

Tấm ảnh chỉ đóng vai trò là một phần của nội dung văn bản, không cần chú thích riêng biệt hoặc tấm ảnh đó không thể tách rời khỏi ngữ cảnh của đoạn văn.
Ví dụ:
Ảnh avatar người dùng: Trong phần bình luận hoặc thanh menu.
Icon trang trí: Các biểu tượng nhỏ đi kèm với văn bản như icon điện thoại, email trong phần thông tin liên hệ.
Dùng cách 2 (<figure>) khi:

Tấm ảnh là một khối nội dung độc lập, mang tính minh họa cao và cần có chú thích đi kèm để giải thích rõ nội dung. <figure> có thể di chuyển nó đến vị trí khác nhau trong bài mà không làm mất đi ý nghĩa nội dung chính.
Ví dụ:
Ảnh sản phẩm chi tiết: trong trang chi tiết sản phẩm, kèm theo chú thích về tên model và giá bán.
Biểu đồ hoặc bản đồ: Một biểu đồ thống kê doanh thu cần có dòng chú thích bên dưới để người đọc biết đó là dữ liệu năm nào.
Phần C
Câu C1: Debug Form
Lỗi 1: Dòng 2 — Input "text" không có <label for="...">, vi phạm accessibility.
Sửa: <label for="text">Tên:</label> <input type="text" id="text" name="text" required>
Lỗi 2: Dòng 4 — Input "email" dùng placeholder thay thế nhãn , vi phạm accessibility vì nhãn biến mất khi nhập liệu.
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required>
Lỗi 3: Dòng 6 — Input "password" không có <label for="..."> , vi phạm accessibility.
Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" required>
Lỗi 4: Dòng 7 — Input "password" không có <label for="..."> , vi phạm accessibility.
Sửa: <label for="re-password">Nhập lại mật khẩu:</label> <input type="password" id="re-password" name="re-password" required>
Lỗi 5: Dòng 9 — dùng sai input type="text"và không có <label for="..."> , vi phạm best practice.
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value"0123456789">
Lỗi 6: Dòng 11 — Thẻ <select> thiếu thuộc tính name , vi phạm validation.
Sửa: <label for="city">Thành phố:</label> <select name="city" id="city">
Lỗi 7: Dòng 12,13 — Thẻ <option> thiếu thuộc tính value , vi phạm best practice.
Sửa: <option value="hn">Hà Nội</option> và <option value="hcm">TP.HCM</option>
Lỗi 8: Dòng 17 — Thẻ <label> thiếu thẻ <input type="checkbox"> để người dùng có thể tích chọn, vi phạm accessibility và validation.
Sửa: <input type="checkbox" id="agree" name="agree" required> <label for="agree">Tôi đồng ý điều khoản</label>
Câu C2: Thiết kế chiến lược Validation
Viết pattern regex cho CMND/CCCD và Số tài khoản

CMND/CCCD(đúng 12 chữ số): pattern=[0-9]{12}
Số tài khoản(10-15 chữ số): pattern=[0-9]{10-15}
Mã PIN(đúng 6 chữ số,không hiển thị): dùng type="password" và pattern=[0-9]{6}
HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?

Chưa đủ an toàn.
Vì HTML5 validation chỉ diễn ra ở phía Client. Người dùng hoặc kẻ tấn công có thẻ dễ dàng vượt qua bằng cách sử dụng "Inspect Element" để xóa thuộc tính required hoặc pattern trong code HTML.
Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript):

Kiểm tra tính khớp nhau(Matching).
Validation logic phức tạp (Conditional Validation).
Kiểm tra dữ liệu thời gian thực(Real-time availability).
Hai rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:

Dữ liệu độc hại xâm nhập database: Kẻ tấn công có thẻ gửi dữ liệu sai định dạng hoặc mã độc trực tiếp lên server, gây hỏng hệ thống.
Sai lệch logic nghiệp vụ: Nếu không validate ở Backend, kẻ xấu có thể thay đổi số tiền chuyển khoản thành số âm hoặc vượt quá sô dư thực tế, gây tổn thất tài chính nghiêm trọng cho ngân hàng.
Phần B
Câu B1: Form Đăng ký Tài khoản
HTML không thể validate confirm password vì:
HTML5 chỉ có thể validate dữ liệu của từng ô input độc lập dựa trên các thuộc tính có sẵn. Nó không có khả năng logic để so sáng giá trị giữa 2 ô khác nhau.