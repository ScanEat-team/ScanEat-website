document.getElementById('edit-profile-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Getting the form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const sex = document.getElementById('sex').value;
    const domicile = document.getElementById('domicile').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const diet = document.getElementById('diet').value;

    // Create an object to store the new profile information
    const updatedProfile = {
        name,
        email,
        phone,
        dob,
        sex,
        domicile,
        weight,
        height,
        diet
    };

    // Store the updated profile in localStorage
    localStorage.setItem('profile', JSON.stringify(updatedProfile));

    // Redirect to personal-info.html
    window.location.href = 'personal-Info.html';
});