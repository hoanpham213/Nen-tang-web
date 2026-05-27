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

Câu A4 - SCSS Basics
4 tính năng chính của SCSS
1. Variables ($primary-color)
Lưu giá trị tái sử dụng (màu, font, spacing...) vào biến. Thay đổi 1 chỗ → thay đổi toàn bộ.
$primary-color: #1a1a2e;
$accent-color: #e2b04a;
$font-size-base: 16px;

.button {
    background: $primary-color;
    color: $accent-color;
    font-size: $font-size-base;
}

2. Nesting (lồng nhau)
Viết CSS con lồng bên trong CSS cha, phản ánh cấu trúc HTML. Dùng & để tham chiếu selector cha.
.card {
    padding: 16px;
    border-radius: 8px;

    .card-title {           /* → .card .card-title */
        font-size: 18px;
        color: #222;
    }

    .card-price {           /* → .card .card-price */
        color: red;
        font-weight: bold;
    }

    &:hover {               /* → .card:hover */
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }

    &.featured {            /* → .card.featured */
        border: 2px solid $accent-color;
    }
}

3. Mixins (@mixin, @include)
Tạo "hàm CSS" tái sử dụng, có thể nhận tham số.
/* Khai báo mixin */
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin respond-to($breakpoint) {
    @media (min-width: $breakpoint) {
        @content;           /* nội dung được truyền vào */
    }
}

/* Sử dụng mixin */
.hero {
    @include flex-center;
    height: 100vh;

    @include respond-to(768px) {
        height: 60vh;
    }
}

4. @extend / Inheritance
Cho phép một selector kế thừa toàn bộ style của selector khác. Tránh lặp code.
/* Base style */
%btn-base {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

/* Kế thừa từ %btn-base */
.btn-primary {
    @extend %btn-base;
    background: $primary-color;
    color: white;
}

.btn-secondary {
    @extend %btn-base;
    background: transparent;
    border: 2px solid $primary-color;
    color: $primary-color;
}

- Tại sao trình duyệt không đọc được file .scss?
Trình duyệt chỉ hiểu CSS thuần (.css). File .scss có cú pháp mở rộng (variables, nesting, mixins...) mà trình duyệt không hiểu.

- Cần bước compile (biên dịch) SCSS → CSS:
# Cài Sass (1 lần)
npm install -g sass

# Compile 1 lần
sass style.scss style.css

# Compile tự động khi file thay đổi (watch mode)
sass --watch style.scss:style.css

# Compile cả thư mục
sass --watch scss/:css/