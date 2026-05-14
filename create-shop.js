const shopForm = document.getElementById("shopForm");
const formMessage = document.getElementById("formMessage");
const discoverMoreBtn = document.getElementById("discoverMoreBtn");
const moreProductsSection = document.getElementById("moreProducts");
const backBtn = document.getElementById("backBtn");

function showMessage(text, success = true) {
    formMessage.textContent = text;
    formMessage.className = success ? "form-message success" : "form-message error";
}

function isEmailUnique(email) {
    const shops = JSON.parse(localStorage.getItem("shops")) || [];
    return !shops.some(shop => shop.email.toLowerCase() === email.toLowerCase());
}

shopForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const objective = document.getElementById("objective").value.trim();

    if (!firstName || !lastName || !email || !objective) {
        showMessage("Tous les champs sont obligatoires.", false);
        return;
    }

    if (!email.includes("@")) {
        showMessage("L'adresse e-mail doit contenir un @.", false);
        return;
    }

    if (!isEmailUnique(email)) {
        showMessage("Cet email est déjà utilisé. Choisissez un email unique.", false);
        return;
    }

    const shops = JSON.parse(localStorage.getItem("shops")) || [];
    shops.push({ firstName, lastName, email, objective, createdAt: new Date().toISOString() });
    localStorage.setItem("shops", JSON.stringify(shops));

    showMessage("Votre boutique a été créée avec succès !", true);
    shopForm.reset();
    moreProductsSection.classList.add("hidden");
    discoverMoreBtn.textContent = "Découvrir plus";
    formMessage.scrollIntoView({ behavior: "smooth", block: "center" });
});

discoverMoreBtn.addEventListener("click", () => {
    moreProductsSection.classList.toggle("hidden");
    discoverMoreBtn.textContent = moreProductsSection.classList.contains("hidden") ? "Découvrir plus" : "Réduire";
});

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});
