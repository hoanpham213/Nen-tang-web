PHẦN A - KIỂM TRA ĐỌC HIỂU
Câu A1 - Sync vs Async
- Dự đoán thứ tự output
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

* Giải thích Event Loop
- JavaScript có 1 Call Stack (ngăn xếp thực thi đồng bộ) và 2 hàng đợi:
    + Microtask Queue (ưu tiên cao hơn): Promise .then(), queueMicrotask()
    + Macrotask Queue (ưu tiên thấp hơn): setTimeout, setInterval, I/O events

* Quy tắc Event Loop:

1. Chạy hết code đồng bộ (Call Stack)
2. Chạy toàn bộ Microtask Queue (cho đến khi rỗng)
3. Lấy 1 Macrotask từ Macrotask Queue → chạy
4. Sau mỗi macrotask, lại chạy hết Microtask Queue
5. Lặp lại từ bước 3

* Phân tích từng bước:
- console.log("1") → Call Stack → in ngay: "1 - Start"
- setTimeout(..., 0) → Web API → sau 0ms vào Macrotask Queue
- Promise.resolve().then(...) → Microtask Queue
- console.log("4") → Call Stack → in ngay: "4 - End"
- Call Stack rỗng → chạy Microtask Queue:
    + In "3 - Promise"
    + In "6 - Promise 2" → trong đó setTimeout mới được đưa vào Macrotask Queue
- Microtask Queue rỗng → lấy Macrotask đầu tiên (timeout 0ms): "2 - Timeout 0ms"
- Sau macrotask → check Microtask Queue → rỗng
- Lấy macrotask tiếp theo (nested timeout 0ms): "7 - Nested timeout"
- Lấy macrotask cuối (timeout 100ms): "5 - Timeout 100ms"

Câu A2 - Fetch API
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}

1. await fetch(...) — fetch trả về gì? Tại sao cần await?
fetch() trả về một Promise<Response> — không phải dữ liệu thật mà là lời hứa sẽ có Response. await tạm dừng hàm async, chờ Promise resolve, rồi lấy giá trị thật (đối tượng Response). Không có await thì response sẽ là Promise object, không dùng được.

2. response.ok — Khi nào false?
- response.ok là true khi status code nằm trong 200–299. Là false khi:
    + 404 Not Found — resource không tồn tại
    + 500 Internal Server Error — lỗi phía server
    + 403 Forbidden — không có quyền truy cập
    + 429 Too Many Requests — gọi API quá nhiều

- Lưu ý quan trọng: fetch() không tự throw khi nhận 4xx/5xx — phải tự kiểm tra response.ok.

3. response.json() — Tại sao cần await lần nữa?
response.json() cũng trả về Promise vì body của response được đọc bất đồng bộ (dữ liệu có thể đang stream về). await chờ toàn bộ body về và parse JSON xong mới lấy kết quả.

4. try...catch — Catch những lỗi gì?
- Network error: Mất mạng, DNS không phân giải được, server từ chối kết nối → fetch() throw TypeError
- Lỗi throw thủ công: throw new Error(...) khi !response.ok
- JSON parse error: Response không phải JSON hợp lệ → response.json() throw SyntaxError
- Không catch: Lỗi HTTP 4xx/5xx nếu không kiểm tra response.ok (fetch không tự throw)

Câu A3 - Promise States
* Sơ đồ 3 trạng thái:
                    ┌─────────────┐
                    │   PENDING   │  ← Trạng thái ban đầu
                    │  (Đang chờ) │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
   ┌─────────────────┐       ┌─────────────────┐
   │   FULFILLED     │       │    REJECTED     │
   │  (Thành công)   │       │    (Thất bại)   │
   │  .then(value)   │       │  .catch(reason) │
   └─────────────────┘       └─────────────────┘
   
   Pending  → Fulfilled: resolve(value) được gọi
   Pending  → Rejected:  reject(reason) được gọi
   Trạng thái là FINAL — không thể quay lại Pending

* Callback Hell là gì?
Callback Hell (hay "Pyramid of Doom") xảy ra khi code bất đồng bộ lồng nhau nhiều cấp, tạo ra hình tam giác ngả phải, rất khó đọc và bảo trì.

* Ví dụ 4 cấp callback hell:
// CALLBACK HELL — khó đọc, khó xử lý lỗi
getUser(userId, function(user) {
    getOrders(user.id, function(orders) {
        getOrderDetails(orders[0].id, function(detail) {
            getPayment(detail.paymentId, function(payment) {
                console.log("Payment:", payment);
                // Lỗi ở đây cần try/catch lồng 4 cấp!
            }, function(err) { console.error(err); });
        }, function(err) { console.error(err); });
    }, function(err) { console.error(err); });
}, function(err) { console.error(err); });

* Refactor thành async/await:
// ASYNC/AWAIT — đọc như code đồng bộ, dễ hiểu
async function getPaymentInfo(userId) {
    try {
        const user    = await getUser(userId);
        const orders  = await getOrders(user.id);
        const detail  = await getOrderDetails(orders[0].id);
        const payment = await getPayment(detail.paymentId);
        console.log("Payment:", payment);
    } catch (err) {
        // 1 chỗ xử lý lỗi cho tất cả
        console.error("Lỗi:", err);
    }
}

