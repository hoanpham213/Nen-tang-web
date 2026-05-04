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


Phần B
Câu B1: Form Đăng ký Tài khoản
HTML không thể validate confirm password vì:
HTML5 chỉ có thể validate dữ liệu của từng ô input độc lập dựa trên các thuộc tính có sẵn. Nó không có khả năng logic để so sáng giá trị giữa 2 ô khác nhau.