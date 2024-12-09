document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        const personalBmiElement = document.getElementById('personal-bmi');
        const interpretationElement = document.getElementById('bmi-interpretation');

        // Format BMI hanya dengan dua angka di belakang koma
        const formattedBmi = parseFloat(userData.bmi).toFixed(2);

        personalBmiElement.innerText = formattedBmi || 'N/A';
        interpretationElement.innerText = getBmiInterpretation(formattedBmi);

        // Menyesuaikan warna teks
        personalBmiElement.style.color = 'black';
        interpretationElement.style.color = 'black';
    } else {
        alert('No user data found. Please log in again.');
    }
});

function getBmiInterpretation(bmi) {
    if (bmi === 'N/A') return 'N/A';
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
}