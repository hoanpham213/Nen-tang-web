// ============================================================
// restaurant_bill.js — Tính hóa đơn nhà hàng
// Chạy: node restaurant_bill.js
// ============================================================

// ===== DỮ LIỆU ĐẦU VÀO =====
const order = {
    items: [
        { name: "Phở bò",   qty: 2, price: 65000 },
        { name: "Trà đá",   qty: 3, price: 5000  },
        { name: "Bún chả",  qty: 1, price: 55000 },
        { name: "Cơm rang", qty: 2, price: 45000 },
    ],
    includeTip: true,      // true/false
    // Ngày trong tuần tự detect theo Date() — hoặc override để test
    // Thứ 4 (Wednesday) = thêm giảm 5%
};

// ===== HÀM TÍNH HÓA ĐƠN =====
function tinhHoaDon(order) {

    // 1. Tổng tiền từng món + tổng cộng
    let tongCong = 0;
    for (let i = 0; i < order.items.length; i++) {
        order.items[i].subtotal = order.items[i].qty * order.items[i].price;
        tongCong += order.items[i].subtotal;
    }

    // 2. Xác định % giảm giá theo tổng tiền
    let phanTramGiam = 0;
    if (tongCong > 1000000) {
        phanTramGiam = 15;
    } else if (tongCong > 500000) {
        phanTramGiam = 10;
    }

    // 3. Kiểm tra ngày thứ 4 (Wednesday = 3 trong getDay() — 0=CN, 1=T2...)
    const today = new Date();
    const isWednesday = today.getDay() === 3;
    const bonusGiam = isWednesday ? 5 : 0;
    const tongGiam = phanTramGiam + bonusGiam;

    // 4. Tính các khoản
    const soTienGiam = Math.round(tongCong * tongGiam / 100);
    const sauGiam    = tongCong - soTienGiam;
    const vat        = Math.round(sauGiam * 0.08);
    const tip        = order.includeTip ? Math.round(sauGiam * 0.05) : 0;
    const thanhToan  = sauGiam + vat + tip;

    return {
        tongCong,
        tongGiam,
        phanTramGiam,
        bonusGiam,
        soTienGiam,
        sauGiam,
        vat,
        tip,
        thanhToan,
        isWednesday,
    };
}

// ===== HÀM ĐỊNH DẠNG SỐ =====
function formatMoney(n) {
    return n.toLocaleString("vi-VN") + "đ";
}

// ===== IN HÓA ĐƠN =====
function inHoaDon(order) {
    const bill = tinhHoaDon(order);
    const W = 44; // chiều rộng nội dung

    const line  = "═".repeat(W);
    const dash  = "─".repeat(W);

    console.log(`╔${line}╗`);
    console.log(`║${"        HÓA ĐƠN NHÀ HÀNG".padEnd(W)}║`);
    console.log(`╠${line}╣`);

    // Từng món
    for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        const no   = `${i + 1}. `;
        const name = item.name.padEnd(12);
        const qty  = `x${item.qty}`.padEnd(4);
        const price= `@${Math.round(item.price/1000)}k`.padEnd(6);
        const sub  = `= ${Math.round(item.subtotal/1000)}k`;
        const row  = `${no}${name}${qty}${price}${sub}`;
        console.log(`║ ${row.padEnd(W - 1)}║`);
    }

    console.log(`╠${line}╣`);

    // Tổng cộng
    const danhSachDong = [
        ["Tổng cộng:",
         formatMoney(bill.tongCong)],
        [`Giảm giá (${bill.tongGiam}%):`,
         "-" + formatMoney(bill.soTienGiam)],
        [`VAT (8%):`,
         "+" + formatMoney(bill.vat)],
    ];

    if (order.includeTip) {
        danhSachDong.push([`Tip (5%):`, "+" + formatMoney(bill.tip)]);
    }

    if (bill.isWednesday) {
        danhSachDong.push([`  (Thứ 4 giảm thêm ${bill.bonusGiam}%)`, ""]);
    }

    for (let i = 0; i < danhSachDong.length; i++) {
        const [label, value] = danhSachDong[i];
        const row = label.padEnd(W - value.length - 2) + value;
        console.log(`║ ${row.padEnd(W - 1)}║`);
    }

    console.log(`╠${line}╣`);

    // Thanh toán
    const thanhToanStr = formatMoney(bill.thanhToan);
    const thanhToanRow = "THANH TOÁN:".padEnd(W - thanhToanStr.length - 2) + thanhToanStr;
    console.log(`║ ${thanhToanRow.padEnd(W - 1)}║`);

    console.log(`╚${line}╝`);

    // Thông tin thêm
    if (bill.tongGiam > 0) {
        console.log(`\n💡 Đã áp dụng giảm giá ${bill.tongGiam}%`);
        if (bill.isWednesday) console.log("   (Khuyến mãi thứ Tư +5%)");
    }
}

// ===== CHẠY =====
inHoaDon(order);