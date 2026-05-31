PHẦN A - KIỂM TRA ĐỌC HIỂU
Câu A1 - Function Declaration vs Expression vs Arrow
- 3 cách viết hàm tinhThueBaoHiem(luong)
// ── Cách 1: Function Declaration ──
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong:    luong,
        thuc_nhan: luong - thue
    };
}

// ── Cách 2: Function Expression ──
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong:    luong,
        thuc_nhan: luong - thue
    };
};

// ── Cách 3: Arrow Function ──
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong:    luong,
        thuc_nhan: luong - thue
    };
};

- Khác nhau gì về hosting?
                        Function Declaration                Function Expression                   Arrow Function
Hosting         |Có - kéo cả khai báo lẫn thân hàm | Không - chỉ kéo biến (underfined)  | Không - giống Expression      |
                |lên đầu                           |                                    |                               |
Gọi trước khi   |Được                              |    TypeError                       |   TypeError                   | 
khai báo        |                                  |                                    |                               |

- VD minh họa:
// Function Declaration: GỌI TRƯỚC khai báo → OK
console.log(cong(2, 3));     // → 5
function cong(a, b) { return a + b; }

// Function Expression: GỌI TRƯỚC → TypeError
console.log(tru(5, 2));      // → TypeError: tru is not a function
var tru = function(a, b) { return a - b; };

// Arrow Function: GỌI TRƯỚC → ReferenceError (dùng let/const)
console.log(nhan(3, 4));     // → ReferenceError
const nhan = (a, b) => a * b;

Câu A2 - Scope & Closure
* Đoạn 1: Counter với Closure
const c = counter();
console.log(c.increment());  // → 1
console.log(c.increment());  // → 2
console.log(c.increment());  // → 3
console.log(c.decrement());  // → 2
console.log(c.getCount());   // → 2

- Giải thích: count là biến private bên trong counter(). Ba method increment, decrement, getCount tạo thành closure — chúng "nhớ" và chia sẻ cùng 1 biến count. Mỗi lần gọi sẽ thay đổi trực tiếp biến đó.

* Đoạn 2: var với let trong setTimeOut
// Output sau khi chạy:
// var: 3   (3 lần — vì i đã = 3 khi timeout chạy)
// var: 3
// var: 3
// let: 0   (đúng thứ tự — mỗi iteration có j riêng)
// let: 1
// let: 2

- Giải thích chi tiết:
    + var i có function scope — chỉ có 1 biến i duy nhất cho toàn bộ vòng lặp. Khi các callback của setTimeout chạy (sau 100ms), vòng lặp đã chạy xong → i = 3. Tất cả 3 callback đều đọc cùng 1 biến i = 3.
    + let j có block scope — mỗi lần lặp tạo ra 1 biến j mới và riêng biệt. Closure của mỗi callback "đóng gói" đúng giá trị j của lần lặp đó (0, 1, 2). Khi chạy sau 200ms, mỗi callback vẫn nhớ đúng j của mình.