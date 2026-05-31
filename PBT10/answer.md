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