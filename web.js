const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const discoverBtn = document.getElementById("discoverBtn");

const productsSection = document.getElementById("products");
const products = document.querySelectorAll(".product");

function filterProducts() {

    const value = searchInput.value.toLowerCase().trim();

    products.forEach(product => {

        const productName = product.querySelector("h3").textContent.toLowerCase();
        const category = product.dataset.category.toLowerCase();

        const match =
            productName.includes(value) ||
            category.includes(value);

        product.style.display = match ? "block" : "none";

    });
}

// Recherche au clic
searchBtn.addEventListener("click", filterProducts);

// Recherche avec touche Entrée
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        filterProducts();
    }
});

// Scroll vers les produits
discoverBtn.addEventListener("click", () => {
    productsSection.scrollIntoView({
        behavior: "smooth"
    });
});