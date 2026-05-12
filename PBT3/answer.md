PHẦN A - KIỂM TRA ĐỌC HIỂU
Câu A1: Cách nhúng CSS
Có 3 cách nhúng CSS vào HTML phổ biến: Inline, Internal, External
1. Inline
- Inline là cách viết CSS trực tiếp trong thuộc tính <style> của một thẻ HTML

Ví dụ:
<button style="background-color: red; font-size: 20px;">Mua hàng</button>

Ưu điểm:
- Không cần file CSS riêng 
- Thay đổi tức thì, có thể thử nghiệm với một phần tử nhỏ
- Không bị ảnh hưởng bởi cascade của file khác

Nhược điểm:
- Không tái sử dụng
- Trộn lẫn HTML và CSS - file HTML bị rối, khó đọc
- Khó bảo trì với dự án lớn

Khi nào nên dùng:
- Khi test nhanh một thuộc tính CSS
- Khi cần style đặc biệt cho đúng một element

2. Internal CSS
- Là cách viết thẻ <style> nằm trong thẻ <head> của HTML

Ví dụ:
<head>
    <style>
        <p style="color: #333; font-size: 16px;> abcxyz </p>
    </style>
</head>

Ưu điểm:
- Không cần file riêng - 1 file HTML duy nhất
- Tải nhanh hơn vì không có thêm HTTP request
- Phù hợp cho bài tập, demo nhỏ

Nhược điểm:
- Không dùng chung được qua nhiều trang
- Sửa giao diện phải mở từng file HTML
- File HTML ngày càng dài, khó tìm code

Khi nào nên dùng:
- Dùng cho ví dụ ngắn
- Dùng cho bài tâp, demo đơn giản

3. External CSS
- Là cách viết CSS trong một file riêng, ví dụ style.css, sau đó liên kết với HTML bắng thẻ <link>

Ví dụ: 
<head>
    <link rel="stylesheet" href="style.css">
</head>

Trong đó nội dung file style.css:
body {color: red; font-size: 20px}

Ưu điểm:
- Dễ tái sử dụng cho nhiều trang
- Dễ bảo trì và mở rộng
- Tách biệt hoàn toàn HTML và CSS

Nhược điểm:
- Cần quản lý nhiều file hơn
- Nếu đường dẫn sai không thể áp dụng CSS

Khi nào nên dùng:
- Có thể dùng cho mọi dự án thực tế
- Dùng khi website có nhiều trang
- Dùng cho môi trường làm việc chuyên nghiệp khi cần bảo trì dài hạn

Câu hỏi thêm:
Nếu cùng một element có cả inline, internal và external CSS cùng áp dụng một thuộc tính, thông thường inline CSS thắng vì inline CSS có độ ưu tiên cao hơn selector trong internal và external CSS.

Tuy nhiên, kết quả cuối cùng còn phụ thuộc vào cascade, specificity, thứ tự khai báo và !important. Nếu external hoặc internal CSS có !important, nó có thể thắng inline CSS bình thường. Nếu cả hai rule có cùng mức ưu tiên và cùng specificity, rule viết sau sẽ được áp dụng.