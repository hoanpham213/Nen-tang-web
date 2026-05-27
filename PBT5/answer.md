PHẦN A - KIỂM TRA ĐỌC HIỂU  
Câu A1 - Viewpoint và Mobile-First
1. Thẻ <meta viewpoint> chuẩn
<meta name="viewport" content="width=device-width, initial-scale=1.0">

- Giải thích từng thuộc tính:
    + name="viewport" — Khai báo đây là thẻ điều chỉnh viewport (vùng hiển thị) của trình duyệt
    + width=device-width — Đặt chiều rộng viewport bằng đúng chiều rộng màn hình thiết bị (thay vì mặc định 980px như trên desktop)
    + initial-scale=1.0 — Mức zoom ban đầu = 1 (không phóng to, không thu nhỏ). Giá trị 1.0 = 100%

2. Nếu thiếu thẻ này, Iphone hiển thị trang web thế nào?
Khi thiếu <meta viewport>, iPhone sẽ giả định trang web rộng 980px (mặc định desktop), rồi thu nhỏ toàn bộ trang để vừa màn hình 375px → trang trông rất nhỏ, chữ bé tí, người dùng phải zoom tay mới đọc được. Mọi media query responsive cũng sẽ không hoạt động đúng vì trình duyệt không nhận viewport thực của thiết bị.

3. Mobile-First và Desktop-First
- Mobile-First: Viết CSS mặc định cho màn hình nhỏ nhất, dùng min-width để mở rộng lên
VD:
/* Mobile-First — CSS mặc định là mobile */
.container {
    width: 100%;        /* mobile: full width */
    font-size: 14px;
}

/* Tablet trở lên */
@media (min-width: 768px) {
    .container {
        width: 720px;
        font-size: 16px;
    }
}

/* Desktop trở lên */
@media (min-width: 1024px) {
    .container {
        width: 960px;
        font-size: 18px;
    }
}

- Desktop-First: Viết CSS mặc định cho màn hình lớn, dùng max-width để thu nhỏ xuống
VD:
/* Desktop-First — CSS mặc định là desktop */
.container {
    width: 960px;       /* desktop: fixed width */
    font-size: 18px;
}

/* Tablet trở xuống */
@media (max-width: 1023px) {
    .container {
        width: 720px;
        font-size: 16px;
    }
}

/* Mobile trở xuống */
@media (max-width: 767px) {
    .container {
        width: 100%;
        font-size: 14px;
    }
}

- Tại sao Mobile-First được khuyên dùng?
    + Hơn 60% traffic web hiện nay đến từ điện thoại → ưu tiên trải nghiệm mobile là hợp lý.
    + CSS mobile thường đơn giản hơn → dễ mở rộng lên desktop (thêm tính năng) thay vì phải ghi đè (xóa tính năng).
    + Trình duyệt mobile chỉ tải CSS cần thiết → hiệu suất tốt hơn.
    + Phù hợp với tiêu chí "progressive enhancement" (cải tiến dần lên).

Câu A2 - Breakpoints
Breakpoints chuẩn theo Bootstrap 5:
Breakpoint                  Kích thước      Thiết bị đại diện                   Lưới sản phẩm nên mấy cột?
xs (extra small)            < 576px         Điện thoại nhỏ (iPhone SE)          1 cột
sm (small)                  ≥ 576px         Điện thoại lớn (iPhone 14)          1–2 cột
md (medium)                 ≥ 768px         Tablet (iPad Mini)                  2 cột
lg (large)                  ≥ 992px         Tablet lớn / Laptop nhỏ             3 cột
xl (extra large)            ≥ 1200px        Desktop / Laptop                    4 cột
xxl (extra extra large)     ≥ 1400px        Màn hình lớn                        4–6 cột

Câu A3 - Media Queries
CSS:
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }

Chiều rộng màn hình	    .container width
375px (iPhone SE)	    100%
600px	                540px
800px	                720px
1000px	                960px
1400px	                1140px