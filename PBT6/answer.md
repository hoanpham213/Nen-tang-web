TRACK A - BOOTSTRAP 5
PHẦN A - ĐỌC HIỂU
Câu A1 - Grid System
- Phân tích:
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>

- Sơ đồ:
MOBILE (< 768px):          TABLET (768–991px):        DESKTOP (≥ 992px):
┌──────────────┐           ┌──────┬──────┐            ┌────┬────┬────┬────┐
│    Box 1     │           │Box 1 │Box 2 │            │ B1 │ B2 │ B3 │ B4 │
├──────────────┤           ├──────┼──────┤            └────┴────┴────┴────┘
│    Box 2     │           │Box 3 │Box 4 │
├──────────────┤           └──────┴──────┘
│    Box 3     │
├──────────────┤
│    Box 4     │
└──────────────┘

- Bảng layout theo kích thước:
Kích thước         <76px(Mobile)                            768-991px(Tablet)       ≥992px(Desktop)
Class áp dụng       col-12                                  col-md-6                col-lg-3
Số cột              12/12=1                                 6/12=2                  3/12=4
Box layout          4 box xếp dọc, mỗi box full width       2 box/hàng, 2 hàng      4 box trên 1 hàng ngang

* Câu hỏi thêm
- col-md-6 nghĩa là gì?
col-md-6 = tại breakpoint md (≥ 768px) trở lên, phần tử này chiếm 6 cột trong tổng 12 cột của grid → tương đương 50% chiều rộng container. Prefix md là viết tắt của "medium", tương ứng màn hình ≥ 768px.

- Tại sao không cần viết col-sm-12?
Vì Bootstrap dùng nguyên tắc Mobile-First — class col-12 đã áp dụng cho mọi kích thước từ nhỏ nhất (xs, < 576px) trở lên. Khi gặp breakpoint lớn hơn (md, lg...) thì class đó ghi đè lên. Viết thêm col-sm-12 là thừa vì col-12 đã bao gồm cả sm rồi

Câu A2 - Utilities & Components
1. Giải thích d-none d-md-block
<div class="d-none d-md-block">Nội dung này</div>
+ d-none → display: none — ẩn ở mọi kích thước (mặc định, Mobile-First)
+ d-md-block → display: block khi màn hình ≥ 768px (tablet trở lên)

- Kết quả:
    + Mobile (< 768px): ẩn
    + Tablet & Desktop (≥ 768px): hiện

-> Dùng để ẩn nội dung trên mobile, chỉ hiện trên tablet/desktop. Ví dụ: sidebar, cột quảng cáo.

2. Năm spacing utilities
- Bootstrap dùng quy tắc: {property}{sides}-{size}
    + Property: m (margin), p (padding)
    + Sides: t top, b bottom, s start/left, e end/right, x ngang, y dọc, (trống) = tất cả
    + Size: 0–5 (0=0, 1=0.25rem, 2=0.5rem, 3=1rem, 4=1.5rem, 5=3rem), auto

Class       CSS tương đương                     Giải thích
mt-3        margin-top: 1rem                    Margin trên = 16px
px-4        padding-left: 1.5rem;               Padding hai bên trái/phải = 24px
            padding-right: 1.5rem               
mb-auto     margin-bottom: auto                 Margin dưới tự động — dùng để đẩy nút xuống đáy trong flexbox
py-2        padding-top: 0.5rem;                Padding trên dưới = 8px
            padding-bottom: 0.5rem              
ms-3        margin-left: 1rem                   Margin trái = 16px (ms = margin-start)

3. Sự khác nhau giữa .container, .container-fluid, .container-md
Class           Hành vi                         Dùng khi nào
.container      Có max-width cố định theo       Layout thông thường, 
                từng breakpoint (540px /        nội dung không quá rộng
                720px / 960px / 1140px /
                 1320px), căn giữa trang

.container-     Luôn rộng 100% màn hình,        Khi muốn nội dung full 
fluid           không có max-width              width (banner, navbar)
                
.container-md   100% width trên mobile          Khi muốn full width trên 
                (< 768px), chuyển sang          mobile nhưng có giới hạn trên desktop
                fixed-width từ md (≥ 768px)
                trở lên      

PHẦN C - PHÂN TÍCH
Câu C1 - Tùy biến Bootstrap
1. Quy trình đổi màu $primary sang #E63946
- Cần công cụ: Node.js + npm + Sass (vì Bootstrap gốc viết bằng SCSS)
- Các bước:
# Bước 1: Cài Bootstrap qua npm
npm install bootstrap

# Bước 2: Cài Sass
npm install -g sass

# Bước 3: Tạo file custom.scss — ghi đè biến TRƯỚC khi import Bootstrap:
// custom.scss

// Ghi đè biến Bootstrap TRƯỚC khi import
$primary: #E63946;

// Sau đó import Bootstrap (Bootstrap sẽ dùng biến mới)
@import "../node_modules/bootstrap/scss/bootstrap";

# Bước 4: Compile SCSS → CSS:
sass custom.scss custom.css

# Bước 5: Dùng file custom.css thay vì Bootstrap CDN trong HTML:
<link rel="stylesheet" href="custom.css">

2. Tại sao KHÔNG nên override trực tiếp .btn-primary { background: red; }?
/* CÁCH SAI — không nên làm */
.btn-primary {
    background: red;
}

* Có 3 vấn đề:
- Vấn đề 1 — Chỉ ghi đè một chỗ, không ghi đè toàn bộ:
Bootstrap dùng $primary ở rất nhiều nơi: .btn-primary, .bg-primary, .text-primary, .border-primary, .badge.bg-primary, focus ring, hover state... Override thủ công từng class sẽ bỏ sót nhiều chỗ, giao diện trở nên không nhất quán.

- Vấn đề 2 — Hover/focus state bị sai màu:
Bootstrap tự tính màu hover/active từ $primary (tối hơn 10%). Nếu chỉ ghi đè background thì màu hover vẫn là màu cũ, trông rất lạ.

- Vấn đề 3 — Khó bảo trì:
Khi nâng cấp Bootstrap lên version mới, phải tìm lại tất cả các override thủ công và kiểm tra lại. Dùng SASS variables thì chỉ cần sửa 1 dòng $primary: #E63946; là xong.

-> Kết luận: Dùng SCSS variables đảm bảo nhất quán (tất cả components dùng cùng màu), đúng (hover/focus được tính lại đúng), và dễ bảo trì.