// ============================================================
// Product Catalog — 100% render bằng JavaScript
// ============================================================

const products = [
    { id:1,  name:"iPhone 16",     price:25990000, category:"phone",     image:"https://placehold.co/300x200/4a90e2/fff?text=iPhone+16",     rating:4.5, inStock:true  },
    { id:2,  name:"MacBook Pro",   price:45990000, category:"laptop",    image:"https://placehold.co/300x200/e2724a/fff?text=MacBook+Pro",   rating:4.8, inStock:true  },
    { id:3,  name:"AirPods Pro",   price:6990000,  category:"accessory", image:"https://placehold.co/300x200/4ae27a/fff?text=AirPods+Pro",   rating:4.3, inStock:true  },
    { id:4,  name:"iPad Air",      price:16990000, category:"tablet",    image:"https://placehold.co/300x200/e2c94a/fff?text=iPad+Air",      rating:4.6, inStock:false },
    { id:5,  name:"Samsung S24",   price:22990000, category:"phone",     image:"https://placehold.co/300x200/9b4ae2/fff?text=Galaxy+S24",    rating:4.4, inStock:true  },
    { id:6,  name:"Dell XPS 15",   price:35990000, category:"laptop",    image:"https://placehold.co/300x200/4ae2d4/fff?text=Dell+XPS+15",   rating:4.7, inStock:true  },
    { id:7,  name:"Galaxy Buds",   price:3490000,  category:"accessory", image:"https://placehold.co/300x200/e24a8a/fff?text=Galaxy+Buds",   rating:4.1, inStock:true  },
    { id:8,  name:"Xiaomi Pad 6",  price:7990000,  category:"tablet",    image:"https://placehold.co/300x200/4a6ae2/fff?text=Xiaomi+Pad+6",  rating:4.2, inStock:true  },
    { id:9,  name:"Pixel 9",       price:19990000, category:"phone",     image:"https://placehold.co/300x200/6ae24a/fff?text=Pixel+9",       rating:4.6, inStock:true  },
    { id:10, name:"ThinkPad X1",   price:32990000, category:"laptop",    image:"https://placehold.co/300x200/e2a44a/fff?text=ThinkPad+X1",   rating:4.5, inStock:true  },
    { id:11, name:"Apple Watch",   price:11990000, category:"accessory", image:"https://placehold.co/300x200/4ac2e2/fff?text=Apple+Watch",   rating:4.7, inStock:true  },
    { id:12, name:"Samsung Tab",   price:13990000, category:"tablet",    image:"https://placehold.co/300x200/c24ae2/fff?text=Samsung+Tab",   rating:4.3, inStock:false },
];

// ── State ──
let cartCount     = 0;
let activeCategory = "all";
let searchKeyword  = "";
let sortValue      = "default";

// ── Build UI ──
const app = document.querySelector("#app");

// Navbar
const navbar = document.createElement("nav");
navbar.className = "navbar";
navbar.innerHTML = `
    <div class="nav-logo">🛍️ TechMall</div>
    <div class="nav-actions">
        <button class="dark-toggle" id="darkToggle">🌙 Dark Mode</button>
        <div class="cart-icon" id="cartIcon">
            🛒<span class="cart-badge" id="cartBadge" style="display:none">0</span>
        </div>
    </div>`;
app.appendChild(navbar);

// Controls
const controls = document.createElement("div");
controls.className = "controls";
controls.innerHTML = `
    <input class="search-input" id="searchInput" type="text" placeholder="🔍 Tìm kiếm sản phẩm...">
    <select class="sort-select" id="sortSelect">
        <option value="default">Sắp xếp mặc định</option>
        <option value="price-asc">Giá: Thấp → Cao</option>
        <option value="price-desc">Giá: Cao → Thấp</option>
        <option value="name-az">Tên: A → Z</option>
        <option value="rating">Đánh giá cao nhất</option>
    </select>`;
app.appendChild(controls);

// Category filters
const catDiv = document.createElement("div");
catDiv.className = "category-filters";
const categories = ["all", "phone", "laptop", "tablet", "accessory"];
const catLabels   = { all:"Tất cả", phone:"📱 Điện thoại", laptop:"💻 Laptop", tablet:"📱 Máy tính bảng", accessory:"🎧 Phụ kiện" };
categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className   = `cat-btn${cat === "all" ? " active" : ""}`;
    btn.textContent = catLabels[cat];
    btn.dataset.cat = cat;
    catDiv.appendChild(btn);
});
app.appendChild(catDiv);

// Product count
const countEl = document.createElement("p");
countEl.className = "product-count";
countEl.id = "productCount";
app.appendChild(countEl);

// Product grid
const grid = document.createElement("div");
grid.className = "product-grid";
grid.id = "productGrid";
app.appendChild(grid);

// ── Render ──
function getFilteredProducts() {
    let list = [...products];

    if (activeCategory !== "all")
        list = list.filter(p => p.category === activeCategory);

    if (searchKeyword)
        list = list.filter(p => p.name.toLowerCase().includes(searchKeyword.toLowerCase()));

    if (sortValue === "price-asc")   list.sort((a,b) => a.price - b.price);
    if (sortValue === "price-desc")  list.sort((a,b) => b.price - a.price);
    if (sortValue === "name-az")     list.sort((a,b) => a.name.localeCompare(b.name));
    if (sortValue === "rating")      list.sort((a,b) => b.rating - a.rating);

    return list;
}

function renderProducts() {
    const list = getFilteredProducts();
    grid.innerHTML = "";
    countEl.textContent = `Hiển thị ${list.length} sản phẩm`;

    if (list.length === 0) {
        const msg = document.createElement("div");
        msg.className   = "no-results";
        msg.textContent = "Không tìm thấy sản phẩm phù hợp 😔";
        grid.appendChild(msg);
        return;
    }

    const fragment = document.createDocumentFragment();
    list.forEach(p => fragment.appendChild(createCard(p)));
    grid.appendChild(fragment);
}

function createCard(p) {
    const card = document.createElement("div");
    card.className  = "product-card";
    card.dataset.id = p.id;

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;

    const body = document.createElement("div");
    body.className = "card-body";

    const name  = document.createElement("div");
    name.className   = "card-name";
    name.textContent = p.name;

    const price = document.createElement("div");
    price.className   = "card-price";
    price.textContent = p.price.toLocaleString("vi-VN") + "đ";

    const rating = document.createElement("div");
    rating.className   = "card-rating";
    rating.textContent = "⭐".repeat(Math.round(p.rating)) + ` (${p.rating})`;

    const stock = document.createElement("div");
    stock.className   = `card-stock${p.inStock ? "" : " out"}`;
    stock.textContent = p.inStock ? "✅ Còn hàng" : "❌ Hết hàng";

    const btn = document.createElement("button");
    btn.className   = "add-cart-btn";
    btn.textContent = p.inStock ? "🛒 Thêm giỏ" : "Hết hàng";
    btn.disabled    = !p.inStock;

    body.appendChild(name);
    body.appendChild(price);
    body.appendChild(rating);
    body.appendChild(stock);
    body.appendChild(btn);
    card.appendChild(img);
    card.appendChild(body);
    return card;
}

// ── Events ──
// Search realtime
document.querySelector("#searchInput").addEventListener("input", (e) => {
    searchKeyword = e.target.value;
    renderProducts();
});

// Sort
document.querySelector("#sortSelect").addEventListener("change", (e) => {
    sortValue = e.target.value;
    renderProducts();
});

// Category filter (Event Delegation)
catDiv.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cat-btn")) return;
    catDiv.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    activeCategory = e.target.dataset.cat;
    renderProducts();
});

// Card click → Modal | Add to cart (Event Delegation)
grid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const p = products.find(p => p.id === Number(card.dataset.id));

    // Click nút thêm giỏ
    if (e.target.classList.contains("add-cart-btn")) {
        e.stopPropagation();
        cartCount++;
        const badge = document.querySelector("#cartBadge");
        badge.textContent = cartCount;
        badge.style.display = "flex";
        e.target.textContent = "✅ Đã thêm";
        setTimeout(() => { e.target.textContent = "🛒 Thêm giỏ"; }, 1500);
        return;
    }

    // Click card → mở modal
    openModal(p);
});

function openModal(p) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const box = document.createElement("div");
    box.className = "modal-box";

    const closeBtn = document.createElement("button");
    closeBtn.className   = "modal-close";
    closeBtn.textContent = "✕";
    closeBtn.addEventListener("click", () => overlay.remove());

    const img = document.createElement("img");
    img.src = p.image; img.alt = p.name;

    const h2 = document.createElement("h2");
    h2.textContent = p.name;

    const price = document.createElement("div");
    price.className   = "modal-price";
    price.textContent = p.price.toLocaleString("vi-VN") + "đ";

    const meta = document.createElement("div");
    meta.className = "modal-meta";
    meta.innerHTML = `Danh mục: ${p.category}<br>Rating: ⭐ ${p.rating}/5<br>Tình trạng: ${p.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}`;

    box.appendChild(closeBtn);
    box.appendChild(img);
    box.appendChild(h2);
    box.appendChild(price);
    box.appendChild(meta);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Đóng khi click overlay
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });
    // Đóng khi Escape
    document.addEventListener("keydown", function onEsc(e) {
        if (e.key === "Escape") { overlay.remove(); document.removeEventListener("keydown", onEsc); }
    });
}

// Dark mode
document.querySelector("#darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    document.querySelector("#darkToggle").textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Khởi tạo
renderProducts();