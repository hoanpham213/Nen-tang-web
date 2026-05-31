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

Câu A3 - Array Methods
Cho mảng: const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 1. Lấy các số chẵn
const chan = nums.filter(n => n % 2 === 0);
// → [2, 4, 6, 8, 10]

// 2. Nhân mỗi số với 3
const nhan3 = nums.map(n => n * 3);
// → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

// 3. Tính tổng
const tong = nums.reduce((acc, n) => acc + n, 0);
// → 55

// 4. Tìm số đầu tiên > 7
const lon7 = nums.find(n => n > 7);
// → 8

// 5. Kiểm tra CÓ số > 10 không
const coLon10 = nums.some(n => n > 10);
// → false

// 6. Kiểm tra TẤT CẢ đều > 0
const tatcaDuong = nums.every(n => n > 0);
// → true

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const moTa = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// → ["Số 1 là lẻ", "Số 2 là chẵn", ...]

// 8. Đảo ngược không mutate gốc
const dao = [...nums].reverse();
// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// (spread trước để tạo bản sao, tránh thay đổi mảng gốc)