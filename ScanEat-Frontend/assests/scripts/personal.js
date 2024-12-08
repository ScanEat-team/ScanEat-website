document.getElementById('go-back-btn').addEventListener('click', () => {
    const menuOverlay = document.getElementById('menu-overlay');
    // Close the overlay
    menuOverlay.classList.remove('open');
});

function toggleMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('open');
}

