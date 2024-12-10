const apiUrl = "https://scaneats-cc-server-gonlxn2arq-et.a.run.app/makanan";
const apiKey = "jalan";

const productGrid = document.getElementById("product-grid");
const modal = document.getElementById("product-modal");
const modalCloseBtn = modal.querySelector(".close-btn");
const modalProductName = document.getElementById("modal-product-name");
const modalProductImage = document.getElementById("modal-product-image");
const modalProductDescription = document.getElementById("modal-product-description");
const modalNutritionFacts = {
    totalFat: document.getElementById("modal-total-fat"),
    cholesterol: document.getElementById("modal-cholesterol"),
    saturatedFat: document.getElementById("modal-saturated-fat"),
    totalCarbohydrate: document.getElementById("modal-total-carbohydrate"),
    dietaryFiber: document.getElementById("modal-dietary-fiber"),
    sugar: document.getElementById("modal-sugar"),
    sodium: document.getElementById("modal-sodium"),
};

const searchInput = document.getElementById("search-bar"); // Elemen input pencarian
const searchResultsContainer = document.getElementById("search-results"); // Elemen hasil pencarian
let allFoods = []; // Menyimpan semua data makanan

function fetchFoodData() {
    fetch(apiUrl, { headers: { "X-API-Key": apiKey } })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                allFoods = data.data; // Simpan data makanan
                displayFoods(randomizeArray(allFoods)); // Tampilkan makanan dalam urutan acak
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Fungsi untuk mengacak urutan elemen dalam array
function randomizeArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function displayFoods(foods) {
    productGrid.innerHTML = ""; // Clear existing content
    foods.forEach((food) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");

        // Menentukan warna status bar berdasarkan kategori makanan
        let statusBarClass;
        if (food.kategori === "makanan ringan") {
            statusBarClass = "status-bar green"; // Warna hijau untuk makanan ringan
        } else if (food.kategori === "minuman") {
            statusBarClass = "status-bar yellow"; // Warna kuning untuk minuman
        } else {
            statusBarClass = "status-bar red"; // Warna merah sebagai default
        }

        productCard.innerHTML = `
            <div class="${statusBarClass}"></div>
            <img src="${food.makanan_picture}" alt="${food.nama}" />
            <p class="product-name">${food.nama}</p>
        `;
        
        productCard.addEventListener("click", () => showModal(food));
        productGrid.appendChild(productCard);
    });
}

function showModal(food) {
    modalProductName.textContent = food.nama;
    modalProductImage.src = food.makanan_picture;
    modalProductDescription.textContent = food.deskripsi;
    document.getElementById("modal-product-upc").textContent = food.upc || "N/A";
    document.getElementById("modal-product-kategori").textContent = food.kategori || "N/A";
    modalNutritionFacts.totalFat.textContent = food.nutrition.total_fat || "N/A";
    modalNutritionFacts.cholesterol.textContent = food.nutrition.cholesterol || "N/A";
    modalNutritionFacts.saturatedFat.textContent = food.nutrition.saturated_fat || "N/A";
    modalNutritionFacts.totalCarbohydrate.textContent = food.nutrition.total_carbohydrate || "N/A";
    modalNutritionFacts.dietaryFiber.textContent = food.nutrition.dietary_fiber || "N/A";
    modalNutritionFacts.sugar.textContent = food.nutrition.sugars || "N/A";
    modalNutritionFacts.sodium.textContent = food.nutrition.sodium || "N/A";
    modal.style.display = "block";
}

modalCloseBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fungsi pencarian
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredFoods = allFoods.filter(food => 
        food.nama.toLowerCase().includes(searchTerm)
    );

    showSearchResults(filteredFoods); // Tampilkan makanan yang difilter
});

// Fungsi untuk menampilkan hasil pencarian dalam dropdown
function showSearchResults(filteredFoods) {
    searchResultsContainer.innerHTML = ""; // Clear previous results
    if (filteredFoods.length > 0) {
        searchResultsContainer.style.display = "block"; // Tampilkan kontainer hasil pencarian
        filteredFoods.forEach(food => {
            const searchResultItem = document.createElement("div");
            searchResultItem.classList.add("search-result-item");
            searchResultItem.setAttribute("data-product-name", food.nama);
            searchResultItem.setAttribute("data-product-image", food.makanan_picture);
            searchResultItem.innerHTML = `
                <img src="${food.makanan_picture}" alt="${food.nama} Icon" class="result-icon">
                <p>${food.nama}</p>
            `;
            // Tambahkan event listener untuk menampilkan modal saat hasil pencarian diklik
            searchResultItem.addEventListener("click", () => {
                showModal(food);
                searchInput.value = food.nama; // Menampilkan nama makanan di input
                searchResultsContainer.style.display = "none"; // Sembunyikan dropdown
            });
            searchResultsContainer.appendChild(searchResultItem);
        });
    } else {
        searchResultsContainer.style.display = "none"; // Sembunyikan kontainer jika tidak ada hasil
    }
}

// Fetch data on page load
fetchFoodData();
