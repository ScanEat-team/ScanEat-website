document.querySelector('.login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validasi email dan password
    if (!email || !password) {
        alert('Email and password are required.');
        return;
    }

    try {
        // Kirim permintaan login ke API
        const response = await fetch('https://scaneats-cc-server-gonlxn2arq-et.a.run.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-api-key': 'jalan',
            },
            body: new URLSearchParams({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Simpan data respons ke localStorage
            localStorage.setItem('userData', JSON.stringify(data));
            alert('Login successful!');
            window.location.href = 'personal-info.html'; // Redirect ke halaman lain
        } else {
            alert(`Login failed: ${data.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
