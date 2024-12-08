document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent form submission if validation fails
    event.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    // Email validation regex pattern (basic)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Email validation
    if (!email.value || !emailRegex.test(email.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Password validation (at least 6 characters)
    if (!password.value || password.value.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // If everything is valid, submit the form or redirect
    alert('Form is valid!');
    // Proceed with form submission or redirection
    window.location.href = 'home.html'; // Replace with your redirect destination
});

document.getElementById('showPassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    
    // Toggle between password and text input type
    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Show password
    } else {
        passwordField.type = 'password'; // Hide password
    }
});