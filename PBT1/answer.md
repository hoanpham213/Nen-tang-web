Phần A
Câu A1:HTTP & Browser
5 bước khi gõ https://shopee.vnvà nhấn Enter:

1. DNS Lookup — Here is the DNS server: "shopee.vn where is the IP there?" → nhận về ví dụ103.x.x.x
2. TCP Handshake + TLS Handshake — Vì dùng HTTPS, trình duyệt thiết lập kết nối bảo mật (SSL/TLS) với server trước khi gửi dữ liệu
3. HTTP Request — Trình duyệt gửi GET / HTTP/1.1đến server shopee.vn
4. HTTP Response — Server with HTML (status 200 OK) and headers (Content-Type, Set-Cookie…)
5. Parse & Render — Parse HTML → xây DOM tree → tải thêm CSS/JS/ảnh → tính layout (CSSOM) → render lên màn hình (Paint)

2.Trong DevTools của Chrome:

Tab Network trong DevTools cho thấy:

- Please note that HTTP requests (tên file, URL, phương thức)
- Status Code for request (200, 301, 304, 404…)
- Size response goes to thời gian từng request
- Waterfall — biểu đồ timeline cho thấy request nào chờ request nào
- Tổng thời gian load (DOMContentLoaded và Load event ở thanh dưới)
- Headers (Request & Response), Preview, Response body

Câu A2:Semantic HTML
Trang web dưới đây bị Google đánh giá SEO thấp vì:
Nó đang mắc lỗi "Div Soup" lạm dụng <div> cho mọi thứ khiến cho Google không hiểu được cấu trúc của trang web

Các lỗi semantic:
Dùng <div class="header"> cho phần đầu chứa Logo và menu chính. Phải dùng thẻ <header>.
Dùng <div class="menu"> cho phần điều hướng. Phải dùng thẻ <nav>.
Dùng <div class="main"> cho phần nội dung chính. Phải dùng thẻ <main>.
Dùng <div class="product"> cho việc chứa thông tin sản phẩm. Phải dùng thẻ <article>.
Dùng <div class="footer"> cho phần cuối trang. Phải dùng thẻ <footer>.

Câu A3:Block vs Inline
1.Mô tả kết quả hiển thị:

Hộp 1
Text A Text B
Hộp 2
Text C **Text D**
Hộp 3

2.Giải thích:
- Thẻ <div> sẽ chiếm toàn bộ 1 dòng và tự bắt đầu ở 1 dòng mới nên 'Hộp 1', 'Hộp 2', 'Hộp 3' đều nằm trên 1 dòng riêng biệt.
- Thẻ <span> và <strong> chúng chỉ chiếm không gian đủ cho nội dung và không ép xuống dòng nên:
    + 'Text A' và 'Text B' nằm cạnh nhau trên 1 dòng.
    + Tương tự với 'Text C' và 'Text D'. Riêng thẻ <strong> còn có thêm định dạng in đậm cho chữ nên 'Text D' được in đậm.

Câu A4: Table
1.Sự khác nhau giữa <thead>, <tbody>, <tfoot>:

<thead> là phần tiêu đề của bảng định nghĩa tên các cột.
<tbody> là phần dữ liệu chính của bảng chứa nội dung.
<tfoot> là phần tổng kết ở cuối bảng thường để tính tổng.
2.Không nên dùng table để tạo layout trang web vì:

Thẻ <table> sinh ra chỉ có mục đích duy nhất là hiển thị dữ liệu dạng bảng nên các công cụ tìm kiếm như Google sẽ hiểu sai cấu trúc trang web
Để chia bố cục bằng bảng sẽ phải dùng rất nhiều thẻ <tr>, <td>, colspan,rowspan. Điều này sẽ khiến cho code trở nên rối, file HTML bị nặng hơn, khó đọc và khó chỉnh sửa.
Dùng bảng cho toàn bộ giao diện sẽ khiến tốc độ hiển thị nội dung trang web chậm hơn vì phải tải và tính toán kích thước của toàn bộ nội dung trong bảng.

Phần B
Câu B3: Debug HTML
- Lỗi 1: Dòng 1-Thiếu chữ "html" trong khai báo Doctype (lỗi cú pháp)- cách sửa: Đổi thành <!DOCTYPE HTML>.
- Lỗi 2: Dòng 4-Thiếu thẻ đóng title (lỗi cú pháp) - cách sửa: Thêm thẻ đóng </title> để đóng.
- Lỗi 3: Dòng 8-Thẻ đóng h1 thiếu '/' (Lỗi cú pháp) - cách sửa: Đổi thành </h1>.
- Lỗi 4: Dòng 8-Thẻ <h1> nằm ngoài thẻ <header> (Lỗi semantic)- cách sửa: di chuyển thẻ h1 vào trong.
- Lỗi 5: Dòng 12- Thẻ đóng <a> thiếu dấu '/' (lỗi cú pháp) - cách sửa: Đổi thành </a>.
- Lỗi 6: Dòng 19, 26 - Nhảy bậc tiêu đề từ <h1> xuống thẳng <h3> (Lỗi semantic) - cách sửa: Đổi h3 thành h2.
- Lỗi 7: Dòng 20- Tthiếu thuộc tính <alt> - cách sửa:Thêm thuộc tính <alt>.
- Lỗi 8: Dòng 22- Các thẻ đóng sai thứ tự quy tắc (lỗi cú pháp) - cách sửa: đóng thẻ <b> trước rồi mới đóng thẻ <p>.
- Lỗi 9: Dòng 29, 30- Hàng tiêu đề của bảng dùng thẻ <td>(Lỗi semantic) - cách sửa: Đổi thẻ <td> ở chữ "Tên" và "Giá" thành thẻ <th>.
- Lỗi 10: Dòng 40- Dùng 2 thẻ main trong một trang web và nội dung sidebar đặt sai thẻ (Lỗi Semantic)- cách sửa: Đổi thẻ <main> thành <asider>
- Lỗi 11: Dòng 45- Thiếu thẻ đóng cho đoạn văn (lỗi cú pháp) - Cách sửa: thêm </p> vào cuối dòng.