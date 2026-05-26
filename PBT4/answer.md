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