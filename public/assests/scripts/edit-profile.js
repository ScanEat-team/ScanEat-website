document.addEventListener('DOMContentLoaded', () => {
    // Ambil data user dari localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Isi form dengan data dari localStorage
    if (userData) {
        document.getElementById('name').value = userData.name || '';
        document.getElementById('sex').value = userData.sex.toLowerCase() || 'male';
        document.getElementById('domicile').value = userData.domicile || '';
        document.getElementById('dob').value = userData.birthDate || '';
        document.getElementById('phone').value = userData.phone || '';
        document.getElementById('weight').value = userData.weight || '';
        document.getElementById('height').value = userData.height || '';
        document.getElementById('diet').value = userData.dietPreference.toLowerCase().replace(/ /g, '_') || 'not_on_diet';
    } else {
        alert('No user data found. Please log in again.');
    }

    // Simpan perubahan data ketika tombol "Save Profile" diklik
    document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah reload halaman

        // Ambil nilai dari form
        const updatedUserData = {
            name: document.getElementById('name').value,
            sex: document.getElementById('sex').value.charAt(0).toUpperCase() + document.getElementById('sex').value.slice(1),
            domicile: document.getElementById('domicile').value,
            birthDate: document.getElementById('dob').value,
            phone: document.getElementById('phone').value,
            weight: document.getElementById('weight').value,
            height: document.getElementById('height').value,
            dietPreference: document.getElementById('diet').value.replace(/_/g, ' ')
        };

        // Simpan data ke localStorage
        localStorage.setItem('userData', JSON.stringify(updatedUserData));

        // Redirect kembali ke halaman Personal Info
        window.location.href = 'personal-info.html';
    });
});