const searchInput = document.getElementById("searchInput");

const products = document.querySelectorAll(".product");

searchInput.addEventListener("keyup", () => {

    let value = searchInput.value.toLowerCase();

    products.forEach(product => {

        let productName =
        product.querySelector("h3").textContent.toLowerCase();

        let category =
        product.dataset.category.toLowerCase();

        if (
            productName.includes(value) ||
            category.includes(value)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});