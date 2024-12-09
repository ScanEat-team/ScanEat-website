document.getElementById('go-back-btn').addEventListener('click', () => {
    const menuOverlay = document.getElementById('menu-overlay');
    // Close the overlay
    menuOverlay.classList.remove('open');
});

function toggleMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
// Ambil data user dari localStorage
const userData = JSON.parse(localStorage.getItem('userData'));

// Menampilkan data ke halaman
if (userData) {
    document.getElementById('userName').innerText = userData.name || 'N/A';
    document.getElementById('userSex').innerText = userData.sex || 'N/A';
    document.getElementById('userDomicile').innerText = userData.domicile || 'N/A';
    document.getElementById('userBirthDate').innerText = userData.birthDate || 'N/A';
    document.getElementById('userPhone').innerText = userData.phone || 'N/A';
    document.getElementById('userWeight').innerText = userData.weight || 'N/A';
    document.getElementById('userHeight').innerText = userData.height || 'N/A';
    document.getElementById('userDietPreference').innerText = userData.dietPreference || 'N/A';
} else {
    alert('No user data found. Please log in again.');
}
});

// function personal() {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     console.log(userData);
//     if (userData) {
//         return`
//         <section class="info-section">
//                 <h2>Personal Information</h2>
//                 <div class="info-item">
//                     <label>Name</label>
//                     <div id="userName">${userData.name}</div>
//                 </div>
//                 <div class="info-item">
//                     <label>Sex</label>
//                     <div id="userSex">${userData.sex}</div>
//                 </div>
//                 <div class="info-item">
//                     <label>Domicile</label>
//                     <div id="userDomicile">${userData.domicile}</div>
//                 </div>
//                 <div class="info-item">
//                     <label>Birth date</label>
//                     <div id="userBirthDate">${userData.birthDate}</div>
//                 </div>
//                 <div class="info-item">
//                     <label>Phone</label>
//                     <div id="userPhone">${userData.phone}</div>
//                 </div>
//             </section>
//             <section class="info-section">
//                 <h2>Other</h2>
//                 <div class="info-item">
//                     <label>${userData.weight}</label>
//                     <div id="userWeight">70</div>
//                 </div>
//                 <div class="info-item">
//                     <label>${userData.height}</label>
//                     <div id="userHeight">175</div>
//                 </div>
//                 <div class="info-item">
//                     <label>${userData.dietPreference}</label>
//                     <div id="userDietPreference">Not on Diet</div>
//                 </div>
//             </section>
//         `
//     }
// }

// const profileElement = document.getElementById("info");
// profileElement.innerHTML = personal();
// console.log(personal());