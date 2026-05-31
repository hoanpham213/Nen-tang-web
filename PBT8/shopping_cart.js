// ============================================================
// shopping_cart.js — Giỏ hàng dùng Closure pattern
// Chạy: node shopping_cart.js
// ============================================================

function createCart() {
    // Biến private — bên ngoài KHÔNG thể truy cập trực tiếp
    let items = [];
    let discountAmount = 0;
    let discountLabel  = "";

    // Hàm tiện ích (private)
    const findItem = (productId) =>
        items.find(item => item.product.id === productId);

    const formatMoney = (n) =>
        n.toLocaleString("vi-VN") + "đ";

    // API công khai (public)
    return {

        // ── Thêm sản phẩm ──
        addItem(product, quantity = 1) {
            const existing = findItem(product.id);
            if (existing) {
                // Đã có → tăng số lượng
                existing.quantity += quantity;
            } else {
                // Chưa có → thêm mới
                items.push({ product, quantity });
            }
            console.log(`✅ Đã thêm "${product.name}" x${quantity}`);
        },

        // ── Xóa sản phẩm theo id ──
        removeItem(productId) {
            const before = items.length;
            items = items.filter(item => item.product.id !== productId);
            if (items.length < before) {
                console.log(`🗑️  Đã xóa sản phẩm id=${productId}`);
            } else {
                console.log(`⚠️  Không tìm thấy sản phẩm id=${productId}`);
            }
        },

        // ── Cập nhật số lượng ──
        updateQuantity(productId, newQuantity) {
            const item = findItem(productId);
            if (!item) {
                console.log(`⚠️  Không tìm thấy sản phẩm id=${productId}`);
                return;
            }
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            item.quantity = newQuantity;
            console.log(`📝 Đã cập nhật "${item.product.name}" → x${newQuantity}`);
        },

        // ── Tính tổng tiền (trước giảm giá) ──
        getSubtotal() {
            return items.reduce(
                (sum, item) => sum + item.product.price * item.quantity, 0
            );
        },

        // ── Tính tổng sau giảm giá ──
        getTotal() {
            return this.getSubtotal() - discountAmount;
        },

        // ── Áp dụng mã giảm giá ──
        applyDiscount(code) {
            const subtotal = this.getSubtotal();
            const codes = {
                "SALE10":  { type: "percent", value: 10  },
                "SALE20":  { type: "percent", value: 20  },
                "FREESHIP":{ type: "fixed",   value: 30000 },
            };
            const discount = codes[code.toUpperCase()];
            if (!discount) {
                console.log(`❌ Mã giảm giá "${code}" không hợp lệ`);
                return;
            }
            if (discount.type === "percent") {
                discountAmount = Math.round(subtotal * discount.value / 100);
                discountLabel  = `-${discount.value}%`;
            } else {
                discountAmount = discount.value;
                discountLabel  = `-${formatMoney(discount.value)} (freeship)`;
            }
            console.log(`🎫 Áp dụng mã "${code}" — giảm ${formatMoney(discountAmount)}`);
        },

        // ── Tổng số lượng sản phẩm ──
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        // ── Xóa toàn bộ giỏ ──
        clearCart() {
            items = [];
            discountAmount = 0;
            discountLabel  = "";
            console.log("🧹 Đã xóa toàn bộ giỏ hàng");
        },

        // ── In giỏ hàng dạng bảng ──
        printCart() {
            if (items.length === 0) {
                console.log("🛒 Giỏ hàng trống!");
                return;
            }

            const W = 58;
            const line = "─".repeat(W);

            console.log(`┌${line}┐`);
            console.log(`│ ${"#".padEnd(3)}│ ${"Sản phẩm".padEnd(16)}│ ${"SL".padEnd(4)}│ ${"Đơn giá".padEnd(14)}│ ${"Thành tiền".padEnd(12)}│`);
            console.log(`├${line}┤`);

            items.forEach((item, i) => {
                const no       = String(i + 1).padEnd(3);
                const name     = item.product.name.padEnd(16);
                const qty      = String(item.quantity).padEnd(4);
                const price    = item.product.price.toLocaleString("vi-VN").padStart(12);
                const subtotal = (item.product.price * item.quantity)
                                    .toLocaleString("vi-VN").padStart(12);
                console.log(`│ ${no}│ ${name}│ ${qty}│ ${price}  │ ${subtotal}  │`);
            });

            console.log(`├${line}┤`);

            const subtotal = this.getSubtotal();
            const total    = this.getTotal();

            const subRow  = `Tổng cộng:`.padEnd(W - 14) + subtotal.toLocaleString("vi-VN").padStart(12);
            console.log(`│ ${subRow}  │`);

            if (discountAmount > 0) {
                const discRow = `Giảm giá (${discountLabel}):`.padEnd(W - 14) +
                                ("-" + discountAmount.toLocaleString("vi-VN")).padStart(12);
                console.log(`│ ${discRow}  │`);
            }

            const totalRow = `THANH TOÁN:`.padEnd(W - 14) + total.toLocaleString("vi-VN").padStart(12);
            console.log(`├${line}┤`);
            console.log(`│ ${totalRow}  │`);
            console.log(`└${line}┘`);
        }
    };
}

// ===== TEST =====
const cart = createCart();

console.log("───── Thêm sản phẩm ─────");
cart.addItem({ id: 1, name: "iPhone 16",   price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000  }, 2);
cart.addItem({ id: 1, name: "iPhone 16",   price: 25990000 }, 1); // Tăng lên 2

console.log("\n───── Giỏ hàng ban đầu ─────");
cart.printCart();

console.log("\n───── Áp dụng SALE10 ─────");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\n───── Áp dụng mã sai ─────");
cart.applyDiscount("GIAM50");

console.log(`\nTổng số lượng: ${cart.getItemCount()} sản phẩm`);

console.log("\n───── Xóa AirPods (id=3) ─────");
cart.removeItem(3);
console.log(`Sau khi xóa: ${cart.getItemCount()} sản phẩm`);

console.log("\n───── Cập nhật iPhone → x3 ─────");
cart.updateQuantity(1, 3);
cart.printCart();

console.log("\n───── Áp dụng FREESHIP ─────");
cart.applyDiscount("FREESHIP");
cart.printCart();