const video = document.getElementById('camera-feed');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resultElement = document.getElementById('barcode-result');
const productInfo = document.getElementById('product-info');
const productName = document.getElementById('product-name');
const productDescription = document.getElementById('product-description');
const productUPC = document.getElementById('product-upc');
const productKategori = document.getElementById('product-kategori');
const productImage = document.getElementById('product-image');

// Initialize the camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error("Error accessing camera: ", err);
        resultElement.textContent = "Camera access denied.";
    });

// Capture image from video feed
function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
}

// Send image to API
function sendImageToAPI(imageData) {
    const apiUrl = "https://scaneats-cc-server-gonlxn2arq-et.a.run.app/predict";
    const formData = new FormData();
    formData.append("file", dataURItoBlob(imageData));

    fetch(apiUrl, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                resultElement.textContent = "Product Found!";
                displayProductInfo(data.prediction.food_info);
            } else {
                resultElement.textContent = "Product not found.";
            }
        })
        .catch((err) => {
            console.error("Error sending image to API:", err);
            resultElement.textContent = "Error processing image.";
        });
}

// Convert base64 image to Blob
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

// Display product info on the page
function displayProductInfo(foodInfo) {
    productInfo.style.display = "block";
    productName.textContent = foodInfo.nama;
    productDescription.textContent = foodInfo.deskripsi;
    productUPC.textContent = foodInfo.upc;
    productKategori.textContent = foodInfo.kategori;
    productImage.src = foodInfo.makanan_picture;
}

// Add event listener to capture button
document.getElementById("capture-button").addEventListener("click", () => {
    const imageData = captureImage();
    sendImageToAPI(imageData);
});
