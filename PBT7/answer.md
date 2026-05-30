PHẦN A - KIỂM TRA ĐỌC HIỂU
Câu A1 - var/let/const
Dự đoán output:
- Đoạn 1: 
console.log(x);  // → undefined
var x = 5;

    + Dự đoán: undefined
    + Giải thích: var bị hoisting — khai báo được đưa lên đầu scope, nhưng giá trị thì không. JS thực ra chạy như:
var x;           // khai báo được kéo lên
console.log(x);  // undefined (chưa gán giá trị)
x = 5;

- Đoạn 2:
console.log(y);  // → ReferenceError
let y = 10;

    + Dự đoán: ReferenceError: Cannot access 'y' before initialization
    + Giải thích: let cũng bị hoisting, nhưng rơi vào Temporal Dead Zone (TDZ) — vùng từ đầu block đến dòng khai báo. Truy cập trong TDZ → lỗi ngay.

- Đoạn 3:
const z = 15;
z = 20;          // → TypeError
console.log(z);

    + Dự đoán: TypeError: Assignment to constant variable.
    + Giải thích: const không cho phép gán lại giá trị sau khi đã khai báo.

- Đoạn 4:
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);  // → [1, 2, 3, 4]

    + Dự đoán: [1, 2, 3, 4]
    + Giải thích: const ngăn gán lại biến (arr = [...]), nhưng không ngăn thay đổi nội dung của object/array. arr vẫn trỏ đến cùng một mảng, chỉ là nội dung mảng đó thay đổi → hoàn toàn hợp lệ.

- Đoạn 5:
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);   // → "Trong block: 2"
}
console.log("Ngoài block:", a);       // → "Ngoài block: 1"

    + Dự đoán: "Trong block: 2" rồi "Ngoài block: 1"
    + Giải thích: let có block scope — biến a bên trong {} là một biến hoàn toàn khác với a bên ngoài. Hai biến cùng tên nhưng khác scope, không ảnh hưởng nhau.

Câu A2 - Data Types & Coercion
|       Biểu thức       |       Kết quả         |          Giải thích           |
|typeof null            |"object"               |Bug lịch sử của JS từ version 1|
|                       |                       |- null không phải object nhưng |
|                       |                       |typeof trả về "object"         |
|typeof underfined      |"underfined"           |Đúng như tên                   |
|typeof NaN             |"number"               |NaN="Not a number" nhưng thuộc |
|                       |                       |kiểu number - nghịch lý nổi    | 
|                       |                       |tiếng                          |
|"5"+3                  |53                     |+ có string->nối chuỗi. 3 bị   |
|                       |                       |chuyển thành "3"               |
|"5"-3                  |2                      |- không dùng cho string -> "5" |
|                       |                       |bị chuyển thành số 5           |
|"5"*"3"                |15                     |* luôn chuyển cả hai về số     |
|true + true            |2                      |true chuyển thành 1            |
|[]+[]                  |""                     |Hai mảng rỗng-> toString()=""  |
|[]+{}                  |"[object Object]"      |[]->"", {}->"[object Object]"->|
|                       |                       |nối chuỗi                      |
|{}+[]                  |0                      |{} đầu dòng được hiểu là block |
|                       |                       |rỗng                           |

Tại sao "5" + 3 khác "5" - 3?
- Toán tử + có 2 vai trò trong JS: cộng số VÀ nối chuỗi. Khi có bất kỳ operand nào là string, + ưu tiên nối chuỗi → số bị chuyển thành chuỗi.
- Toán tử - chỉ có 1 vai trò: phép trừ số học. Khi gặp string, JS buộc phải chuyển string thành số (numeric coercion) → "5" thành 5 → 5 - 3 = 2.