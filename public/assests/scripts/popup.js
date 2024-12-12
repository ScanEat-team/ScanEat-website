function showPopup() {
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'flex';
}

function closePopup() {
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'none';
    window.location.href = 'home.html'; // Redirect ke halaman home
}

function showErrorPopup(message) {
    const errorPopupContainer = document.getElementById('errorPopupContainer');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message; // Set pesan error
    errorPopupContainer.style.display = 'flex';
}

function closeErrorPopup() {
    const errorPopupContainer = document.getElementById('errorPopupContainer');
    errorPopupContainer.style.display = 'none';
}