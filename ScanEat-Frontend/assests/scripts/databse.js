document.getElementById('search-bar').addEventListener('input', function() {
    let query = this.value.toLowerCase();  // Get the search query and convert it to lowercase
    let products = document.querySelectorAll('.product');  // Get all the product elements

    products.forEach(product => {
        let productName = product.querySelector('.product-name').textContent.toLowerCase();  // Get product name
        if (productName.includes(query)) {
            product.style.display = 'block';  // Show the product if it matches the search query
        } else {
            product.style.display = 'none';  // Hide the product if it doesn't match
        }
    });
});

const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');

// Show the dropdown when the search bar is clicked
searchBar.addEventListener('focus', () => {
    searchResults.style.display = 'block';
});

// Hide the dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// Add click event to dropdown items
document.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', function () {
        const productName = this.querySelector('p').textContent;
        const productImageSrc = this.querySelector('img').src;

        productTitle.textContent = productName;
        productImage.src = productImageSrc;

        // Example dynamic data (replace with actual product data)
        totalFat.textContent = '8 g'; // Replace with real data
        cholesterol.textContent = '20 mg'; // Replace with real data
        saturatedFat.textContent = '3 g'; // Replace with real data
        totalCarbohydrate.textContent = '30 g'; // Replace with real data
        dietaryFiber.textContent = '5 g'; // Replace with real data
        sugar.textContent = '10 g'; // Replace with real data
        natrium.textContent = '300 mg'; // Replace with real data

        modal.style.display = 'flex';
        searchResults.style.display = 'none';
    });
});

const modal = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close-btn');
const productTitle = document.querySelector('.product-title');
const productImage = document.getElementById('product-image');
const totalFat = document.getElementById('total-fat');
const cholesterol = document.getElementById('cholesterol');
const saturatedFat = document.getElementById('saturated-fat');
const totalCarbohydrate = document.getElementById('total-carbohydrate');
const dietaryFiber = document.getElementById('dietary-fiber');
const sugar = document.getElementById('sugar');
const natrium = document.getElementById('natrium');
const personalizedCalories = document.getElementById('personalized-calories');
const personalizedSugar = document.getElementById('personalized-sugar');
const personalizedSalt = document.getElementById('personalized-salt');
const personalizedFat = document.getElementById('personalized-fat');
const forecastProductName = document.getElementById('forecast-product-name');
const forecastHypertension = document.getElementById('forecast-hypertension');
const forecastDiabetes = document.getElementById('forecast-diabetes');
const forecastCholesterol = document.getElementById('forecast-cholesterol');

function setPersonalizedInfo(calories, dailyCalories, sugar, dailySugar, salt, dailySalt, fat, dailyFat) {
    personalizedCalories.textContent = `${calories} calories from your total daily ${dailyCalories} calories needs.`;
    personalizedSugar.textContent = `${sugar} g of sugar from your daily ${dailySugar} g limit.`;
    personalizedSalt.textContent = `${salt} g of salt from your daily ${dailySalt} g limit.`;
    personalizedFat.textContent = `${fat} g of fat from your daily ${dailyFat} g limit.`;
}

// Simulate setting data from backend/ML
function setPersonalizedInfo(calories, dailyCalories, sugar, dailySugar, salt, dailySalt, fat, dailyFat) {
    personalizedCalories.textContent = `${calories} calories from your total daily ${dailyCalories} calories needs.`;
    personalizedSugar.textContent = `${sugar} g of sugar from your daily ${dailySugar} g limit.`;
    personalizedSalt.textContent = `${salt} g of salt from your daily ${dailySalt} g limit.`;
    personalizedFat.textContent = `${fat} g of fat from your daily ${dailyFat} g limit.`;
}

// Simulate setting data from backend/ML
function fetchProductDetails(productId) {
    // Simulated backend response for product data (replace this with your backend API call)
    const backendData = {
        productName: "BengBeng",
        totalFat: "8 g",
        cholesterol: "20 mg",
        saturatedFat: "3 g",
        totalCarbohydrate: "30 g",
        dietaryFiber: "5 g",
        sugar: "10 g",
        natrium: "300 mg",
        personalized: {
            calories: 200,
            dailyCalories: 2000,
            sugar: 10,
            dailySugar: 50,
            salt: 2,
            dailySalt: 5,
            fat: 5,
            dailyFat: 70
        }
    };

    // Set nutrition facts
    totalFat.textContent = backendData.totalFat;
    cholesterol.textContent = backendData.cholesterol;
    saturatedFat.textContent = backendData.saturatedFat;
    totalCarbohydrate.textContent = backendData.totalCarbohydrate;
    dietaryFiber.textContent = backendData.dietaryFiber;
    sugar.textContent = backendData.sugar;
    natrium.textContent = backendData.natrium;

    // Set personalized information
    const personalizedData = backendData.personalized;
    setPersonalizedInfo(
        personalizedData.calories,
        personalizedData.dailyCalories,
        personalizedData.sugar,
        personalizedData.dailySugar,
        personalizedData.salt,
        personalizedData.dailySalt,
        personalizedData.fat,
        personalizedData.dailyFat
    );
}

// Open modal with product details when clicking on a product (not just search result)
document.querySelectorAll('.product, .search-result-item').forEach(product => {
    product.addEventListener('click', function () {
        const productId = this.dataset.productId || "default-id"; // Example: Use a data attribute for the product ID
        const productName = this.querySelector('.product-name')?.textContent || "Unknown Product";
        const productImageSrc = this.querySelector('img')?.src || "";

        // Update modal with the product details
        productTitle.textContent = productName;
        productImage.src = productImageSrc;

        // Fetch product details and update modal (replace with backend call)
        fetchProductDetails(productId);

        // Display the modal
        modal.style.display = 'flex';
        searchResults.style.display = 'none';
    });
});

document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', function () {
        const productName = this.querySelector('.product-name').textContent;

        // Update product name for forecasting
        forecastProductName.textContent = productName;

        // Example forecasting data (replace these with actual backend/ML values)
        forecastHypertension.textContent = '5'; // Replace with ML forecast result
        forecastDiabetes.textContent = '7'; // Replace with ML forecast result
        forecastCholesterol.textContent = '3'; // Replace with ML forecast result

        // Open modal
        modal.style.display = 'flex';
    });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
