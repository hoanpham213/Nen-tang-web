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