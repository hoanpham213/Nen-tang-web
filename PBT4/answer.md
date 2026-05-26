PHẦN A: KIỂM TRA ĐỌC HIỂU
Câu A1 - 5 loại Positioning
Điền bảng:

Position    |  Vẫn chiếm chỗ trong flow     |  Tham chiếu vị trí                    |  Cuộn theo trang  |  Use case
static      |  Có                           |   Không áp dụng                       |  Có               |  Mặc định, dùng khi 
            |                               |                                       |                   |  không cần định vị đặc biệt
relative    |  Có (Vẫn giữ chỗ cũ)          |   Chính bản thân nó                   |  Có               |  Dịch chuyển nhẹ, hoặc 
            |                               |                                       |                   |  làm cho anchor cho 
            |                               |                                       |                   |  absolute con
absolute    |  Không (bị lấy ra khỏi flow)  |   Nearest positioned ancestor         |  Có               |  Badge, dropdown, tooltip 
            |                               |                                       |                   |  — cần đặt chính xác trong 
            |                               |                                       |                   |  1 phần tử cha
fixed       |  Không                        |   Viewport (Cửa sổ trình duyệt)       |  Không            |  Header cố định, nút 
            |                               |                                       |                   |"scroll to top", chat widget
sticky      |  Có (Ban đầu)                 |   Viewport (Khi đạt ngưỡng top/left)  |  Một phần         |  Sticky header, 
            |                               |                                       |                   |sticky sidebar, sticky 
            |                               |                                       |                   |table header

Câu hỏi thêm: 
- Quy tắc: absolute luôn tham chiếu đến "nearest positioned ancestor"
    + "Positioned ancestor" là phần tử cha (hoặc ông, cụ...) có position khác static (tức là relative, absolute, fixed, hoặc sticky)
    + Nếu không có ancestor nào được positioned → nó sẽ tham chiếu đến <body> (hay chính xác hơn là initial containing block)
    + Nếu có ancestor được positioned → nó tham chiếu đến ancestor gần nhất đó

Câu A2 - Flexbox vs Grid - Dự đoán layout
* Trường hợp 1: 
.container { display: flex; }
.item { flex: 1; }
/* 4 items */

Dự đoán: 4 items xếp thành 1 hàng ngang, mỗi item chiếm đều nhau (25% mỗi cái).
flex: 1 = flex-grow: 1, flex-shrink: 1, flex-basis: 0 → tất cả co giãn đều nhau.

┌──────┬──────┬──────┬──────┐
│  1   │  2   │  3   │  4   │
└──────┴──────┴──────┴──────┘

* Trường hợp 2:
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items */

Dự đoán: 3 hàng, 2 cột. Mỗi item chiếm 45% + 2.5%*2 = 50% không gian → vừa 2 item/hàng, 6 items = 3 hàng.

┌──────────┬──────────┐
│    1     │    2     │
├──────────┼──────────┤
│    3     │    4     │
├──────────┼──────────┤
│    5     │    6     │
└──────────┴──────────┘

* Trường hợp 3:
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items */

Dự đoán: 3 items trên 1 hàng ngang, khoảng cách đều giữa các items, tất cả căn giữa theo chiều dọc.
    - Item 1: bên trái | Item 2: giữa | Item 3: bên phải
    - Khoảng trống phân bổ đều giữa các items (không có ở 2 đầu)

┌────────────────────────────────────┐
│ [1]        [2]              [3]    │
└────────────────────────────────────┘

* Trường hợp 4:
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items */

Dự đoán: 1 hàng, 3 cột:
    - Cột 1: cố định 200px
    - Cột 2: chiếm hết phần còn lại (flexible)
    - Cột 3: cố định 200px
    - Khoảng cách 20px giữa các cột

┌─────────┬──────────────────┬─────────┐
│  200px  │       1fr        │  200px  │
│  (1)    │       (2)        │  (3)    │
└─────────┴──────────────────┴─────────┘

* Trường hợp 5:
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items */

Dự đoán: 3 hàng, 3 cột. 7 items ÷ 3 cột = 2 hàng đầy + 1 hàng cuối thiếu.
    - Hàng 1: items 1, 2, 3
    - Hàng 2: items 4, 5, 6
    - Hàng 3: item 7 ở cột đầu tiên (bên trái), 2 ô còn lại trống

┌──────┬──────┬──────┐
│  1   │  2   │  3   │
├──────┼──────┼──────┤
│  4   │  5   │  6   │
├──────┼──────┼──────┤
│  7   │      │      │
└──────┴──────┴──────┘

PHẦN C - SUY LUẬN
Câu C1 - Flexbox và Grid
1. Navigation bar ngang (logo + menu + buttons)
→ Dùng Flexbox
Vì navbar là 1 chiều (hàng ngang), cần phân bổ 3 nhóm (logo, menu, buttons) theo trục ngang với justify-content: space-between và căn dọc với align-items: center. Flexbox rất phù hợp cho bố cục 1 chiều.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
→ Dùng Grid
Vì cần bố cục 2 chiều (hàng + cột), số lượng item không cố định nhưng cần tự động tạo hàng mới. grid-template-columns: repeat(3, 1fr) xử lý hoàn hảo, items tự động wrap theo hàng.

3. Layout blog: main content + sidebar
→ Dùng Grid
Cần chia 2 vùng rõ ràng theo chiều ngang với kích thước xác định (ví dụ: grid-template-columns: 1fr 300px). Grid cho phép kiểm soát kích thước từng vùng chính xác hơn. Flexbox cũng làm được nhưng Grid trực quan hơn cho layout 2D.

4. Footer với 4 cột thông tin
→ Dùng Grid hoặc Flexbox đều được, ưu tiên Grid

Grid: grid-template-columns: repeat(4, 1fr) — các cột đều nhau, dễ kiểm soát.
Flexbox: flex: 1 mỗi cột cũng cho kết quả tương tự.
Nếu cần responsive (4 cột → 2 cột → 1 cột) thì Grid + media query thuận tiện hơn.


5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
→ Dùng Flexbox (column direction)
Bên trong card dùng display: flex; flex-direction: column + margin-top: auto trên nút "Mua" → nút luôn đẩy xuống đáy dù text có dài ngắn khác nhau. Đây là pattern kinh điển của Flexbox.

Câu C2 - Debug Flexbox
- Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
    + Nguyên nhân: Card không dùng Flexbox bên trong, nên các phần tử con (img, h3, btn) xếp bình thường theo flow. Khi tên sản phẩm dài ngắn khác nhau → nút "Mua" ở các card sẽ ở vị trí khác nhau.

    + Code sửa:

/* Thêm vào .card */
.card {
    width: 30%;
    margin: 1.5%;
    display: flex;              /* ← thêm */
    flex-direction: column;     /* ← thêm */
}

/* Thêm margin-top: auto cho nút */
.card .btn {
    padding: 10px;
    margin-top: auto;           /* ← thêm: đẩy nút xuống đáy */
}

- Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
    + Nguyên nhân: Chỉ có display: flex nhưng thiếu justify-content: center (căn ngang) và align-items: center (căn dọc). Mặc định là justify-content: flex-start và align-items: stretch.

    + Code sửa:
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;    /* ← thêm: căn giữa theo chiều ngang */
    align-items: center;        /* ← thêm: căn giữa theo chiều dọc */
}
.hero-content {
    text-align: center;
}

- Lỗi 3: Sidebar bị co lại khi content quá dài
    + Nguyên nhân: Mặc định flex-shrink: 1 → khi content dài ra, cả sidebar lẫn content đều có thể bị co. Sidebar sẽ bị thu nhỏ dưới 250px.

    + Code sửa:
.layout { display: flex; }

.sidebar {
    width: 250px;
    flex-shrink: 0;   /* ← thêm: ngăn sidebar bị co lại */
}

.content {
    flex: 1;          /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
    min-width: 0;     /* ← thêm: tránh overflow trong flex item */
}