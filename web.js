const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const discoverBtn = document.getElementById("discoverBtn");
const cartBtn = document.getElementById("cartBtn");
const createShopBtn = document.getElementById("createShopBtn");
const productsSection = document.getElementById("products");
const products = document.querySelectorAll(".product");
const cartSection = document.getElementById("cartSection");
const cartCount = document.getElementById("cartCount");
const cartItemsContainer = document.getElementById("cartItems");
const cartMessage = document.getElementById("cartMessage");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

function parsePrice(priceText) {
    return Number(priceText.replace(/[^0-9]/g, ""));
}

function formatPriceFCFA(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " FCFA";
}

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

function loadCart() {
    const stored = localStorage.getItem("cartItems");
    cart = stored ? JSON.parse(stored) : [];
    updateCartUI();
}

function updateCartUI() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
    cartTotal.textContent = formatPriceFCFA(total);

    if (cart.length === 0) {
        cartMessage.textContent = "Votre panier est vide.";
        cartItemsContainer.innerHTML = "";
        return;
    }

    cartMessage.textContent = "Voici les produits dans votre panier :";
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <div>${item.quantity} x ${formatPriceFCFA(item.price)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" data-index="${index}">Supprimer</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartItemsContainer.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);
            cart.splice(index, 1);
            saveCart();
            updateCartUI();
        });
    });
}

function toggleDark(){
    document.body.classList.toggle("dark");
}

function addToCart(productElement) {
    const name = productElement.querySelector("h3").textContent.trim();
    const priceText = productElement.querySelector(".price").textContent;
    const price = parsePrice(priceText);
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    cartSection.scrollIntoView({ behavior: "smooth" });
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Votre panier est vide. Ajoutez des produits avant de commander.");
        return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = {
        date: new Date().toISOString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    cart = [];
    saveCart();
    updateCartUI();
    alert("Votre commande a été enregistrée avec succès !");
}

function filterProducts() {
    const value = searchInput.value.toLowerCase().trim();

    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
        const category = product.dataset.category.toLowerCase();
        const match = productName.includes(value) || category.includes(value);
        product.style.display = match ? "block" : "none";
    });
}

searchBtn.addEventListener("click", filterProducts);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        filterProducts();
    }
});

discoverBtn.addEventListener("click", () => {
    productsSection.scrollIntoView({ behavior: "smooth" });
});

cartBtn.addEventListener("click", () => {
    cartSection.scrollIntoView({ behavior: "smooth" });
});

checkoutBtn.addEventListener("click", placeOrder);

createShopBtn.addEventListener("click", () => {
    window.location.href = "create-shop.html";
});

const addToCartButtons = document.querySelectorAll(".product button");
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productElement = button.closest(".product");
        addToCart(productElement);
    });
});

loadCart();
