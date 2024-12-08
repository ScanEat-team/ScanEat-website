const video = document.getElementById('camera-feed');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resultElement = document.getElementById('barcode-result');

// Access the camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error("Error accessing camera: ", err);
        resultElement.textContent = "Camera access denied.";
    });

// Initialize QuaggaJS for barcode scanning
Quagga.init(
    {
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: video, // Use the video element to capture live stream
            constraints: {
                facingMode: "environment", // Use back camera
            },
        },
        decoder: {
            readers: ["upc_reader"], // Focus on UPC barcodes
        },
    },
    (err) => {
        if (err) {
            console.error("Error initializing Quagga: ", err);
            resultElement.textContent = "Error initializing scanner.";
            return;
        }
        console.log("Quagga initialized. Starting...");
        Quagga.start(); // Start scanning
    }
);

// Process detected barcodes
Quagga.onDetected((data) => {
    console.log("Barcode detected: ", data.codeResult.code);
    resultElement.textContent = `Barcode Found: ${data.codeResult.code}`;
    Quagga.stop(); // Stop scanning after a successful detection
});
