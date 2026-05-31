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

