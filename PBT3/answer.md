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

Câu A2 - CSS Selectors
Cho HTML:
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>

Kết quả chọn element:
 #  | Selector               | Chọn được                           | 
|---|------------------------|-------------------------------------|
| 1 | `h1`                   | `ShopTLU`                           | 
| 2 | `.price`               | `25.990.000đ` và `45.990.000đ`      | 
| 3 | `#app header`          | Thẻ `<header class="top-bar dark">` | 
| 4 | `nav a:first-child`    | `Home`                              | 
| 5 | `.product.featured h2` | `MacBook Pro`                       | 
| 6 | `article > p`          | 4 thẻ p (2 giá + 2 mô tả)           | 
| 7 | `a[href="/"]`          | `Home`                              | 
| 8 | `.top-bar.dark h1`     | `ShopTLU`                           | 

Câu A3 - Box model - Tính toán kích thước
- Trướng hợp 1 - Content-box (mặc định)
CSS:
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
-> Chiều rộng hiển thị = 400 + 20×2 + 5×2 = 450px
-> Không gian chiếm trên trang = 450 + 10×2 = 470px

- Trường hợp 2 - Border-box
CSS:
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
-> Chiều rộng hiển thị = 400px (padding + border gói TRONG 400px)
-> Content thực tế = 400 - 20×2 - 5×2 = 350px
-> Không gian chiếm trên trang = 400 + 10×2 = 420px

- Trường hợp 3 - Margin collapse
CSS: 
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
-> Khoảng cách = 40px (chỉ lấy giá trị lớn hơn, KHÔNG cộng)
-> Lý do: Margin dọc giữa 2 block-level elements liền kề bị collapse — browser lấy max(25, 40) = 40px

- Nâng cao: -10px + 40px → max(-10, 40) = 30px (khi có margin âm: lấy max của dương + min của âm = 40 + (-10) = 30px)

Câu A4 - Specificity
- elemennt:
<p class="price" id="main-price">
- Các rules:
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */

1.  Specificity score
Rule	    Selector	    Specificity (a,b,c)	    Giải thích
Rule A	    p	            (0,0,1)	                Có 1 element selector
Rule B	    .price	        (0,1,0)	                Có 1 class selector
Rule C	    #main-price	    (1,0,0)             	Có 1 id selector
Rule D	    p.price	        (0,1,1)             	Có 1 class và 1 element

2. Element sẽ có màu gì?
- Màu hiển thị sẽ là màu đỏ
-> Do rule C có selector #main-price với score 1,0,0 với độ ưu tiên cao hơn nên rule C thắng các rules còn lại 

3. Nếu thêm inline style
<p class="price" id="main-price" style="color: orange;">...</p>
- Element sẽ có màu cam
-> Inline style có độ ưu tiên cao hơn các rule CSS thông thường trong file CSS hoặc trong thẻ <style>

4. Nếu rules A có thêm !important
Nếu rules A thêm !important
p { color: black !important; }
- Element sẽ có màu đen
-> !important làm declaration được ưu tiên hơn các declaration thông thường. Vì vậy, dù selector p có specificity thấp hơn #main-price, rule có !important vẫn thắng các rule thường. Nếu có nhiều rule cùng !important, khi đó mới so sánh specificity và thứ tự khai báo

PHẦN B - THỰC HÀNH CODE
Bài B2 - Box Model Lab
Phần 1 — content-box vs border-box
Hai hộp có cùng CSS cơ bản:

width: 300px;
padding: 20px;
border: 5px solid;
Hộp 1 dùng:

box-sizing: content-box;
Tính toán:

300 + 20 + 20 + 5 + 5 = 350px
Kết quả mong đợi:

Hộp 1 (content-box): chiều rộng thực tế = 350px
Hộp 2 dùng:

box-sizing: border-box;
Kết quả mong đợi:

Hộp 2 (border-box): chiều rộng thực tế = 300px
Giải thích: Với content-box, width chỉ tính phần content, còn padding và border cộng thêm ra ngoài. Với border-box, width đã bao gồm content, padding và border

Phần 2 — Layout 3 cột
Container rộng 1000px.

Nếu không dùng border-box:

Sidebar: 250 + 15 + 15 = 280px
Content: 500 + 20 + 20 = 540px
Ads: 250 + 15 + 15 = 280px
Tổng = 1100px
Vì 1100px > 1000px, layout dễ bị tràn hoặc vỡ.

Nếu dùng border-box, mỗi cột giữ đúng width khai báo:

250 + 500 + 250 = 1000px
Vì vậy layout vừa khít container

Bài B3 - Specificity Battle
Element:
<p id="demo" class="text highlight">Hello World</p>

10 rules đã viết trong specificity.css, sắp xếp từ thấp đến cao:
#       Selector            Color       Score
1       *                   lightgray   0,0,0
2       p                   black       0,0,1
3       [class]             teal        0,1,0
4       .text               blue        0,1,0
5       .highlight          purple      0,1,0
6       p.text              darkblue    0,1,1
7       p.text.highlight    darkgreen   0,2,1
8       body p.text         brown       0,1,2
9       #demo               red         1,0,0
10      #demo.highlight     orangered   1,1,0

Element hiển thị màu: ORANGERED — Rule 10 #demo.highlight có specificity cao nhất (1,1,0).
Thay đổi thứ tự: KHÔNG thay đổi kết quả khi specificity khác nhau. Chỉ khi 2 rules bằng nhau thì rule sau mới thắng.