const video = document.getElementById('camera-feed');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resultElement = document.getElementById('barcode-result');

// Modal elements
const modal = document.getElementById("product-modal");
const modalCloseBtn = modal.querySelector(".close-btn");
const modalProductName = document.getElementById("modal-product-name");
const modalProductImage = document.getElementById("modal-product-image");
const modalProductDescription = document.getElementById("modal-product-description");
const modalProductUPC = document.getElementById("modal-product-upc");
const modalProductKategori = document.getElementById("modal-product-kategori");

// Nutrition facts elements
const modalNutritionFacts = {
    totalFat: document.getElementById("modal-total-fat"),
    cholesterol: document.getElementById("modal-cholesterol"),
    saturatedFat: document.getElementById("modal-saturated-fat"),
    totalCarbohydrate: document.getElementById("modal-total-carbohydrate"),
    dietaryFiber: document.getElementById("modal-dietary-fiber"),
    sugar: document.getElementById("modal-sugar"),
    sodium: document.getElementById("modal-sodium"),
};

let allFoods = [];
let hasShownModal = false; // Ensure the modal only shows once

// Fetch product data from the API
function fetchFoodData() {
    const apiUrl = "https://scaneats-cc-server-gonlxn2arq-et.a.run.app/makanan";
    const apiKey = "jalan";
    fetch(apiUrl, { headers: { "X-API-Key": apiKey } })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                allFoods = data.data; // Store all products in the global variable
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Initialize camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
        video.srcObject = stream;
        video.play();

        // Start the 5-second timer to show a random product modal
        setTimeout(() => {
            if (!hasShownModal) {
                showRandomProduct(); // Show a random product modal after 5 seconds
            }
        }, 5000);
    })
    .catch((err) => {
        console.error("Error accessing camera: ", err);
        resultElement.textContent = "Camera access denied.";
    });

// Show random product modal
function showRandomProduct() {
    if (allFoods.length === 0) {
        console.error("No product data available.");
        return;
    }

    const randomProduct = allFoods[Math.floor(Math.random() * allFoods.length)];

    modalProductName.textContent = randomProduct.nama;
    modalProductImage.src = randomProduct.makanan_picture;
    modalProductDescription.textContent = randomProduct.deskripsi || "No description available.";
    modalProductUPC.textContent = randomProduct.upc || "N/A";
    modalProductKategori.textContent = randomProduct.kategori || "N/A";

    // Populate nutrition facts
    modalNutritionFacts.totalFat.textContent = randomProduct.nutrition.total_fat || "N/A";
    modalNutritionFacts.cholesterol.textContent = randomProduct.nutrition.cholesterol || "N/A";
    modalNutritionFacts.saturatedFat.textContent = randomProduct.nutrition.saturated_fat || "N/A";
    modalNutritionFacts.totalCarbohydrate.textContent = randomProduct.nutrition.total_carbohydrate || "N/A";
    modalNutritionFacts.dietaryFiber.textContent = randomProduct.nutrition.dietary_fiber || "N/A";
    modalNutritionFacts.sugar.textContent = randomProduct.nutrition.sugars || "N/A";
    modalNutritionFacts.sodium.textContent = randomProduct.nutrition.sodium || "N/A";

    modal.style.display = "block"; // Show modal
    hasShownModal = true; // Mark as shown to prevent further pop-ups
}

// Close modal
modalCloseBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fetch data when the page loads
fetchFoodData();
