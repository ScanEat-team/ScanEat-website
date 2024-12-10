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
            // Simpan data user ke localStorage
            const userData = {
                name: data.user.name,
                email: data.user.email,
                sex: data.user.sex || 'N/A', // Menambahkan fallback jika data tidak ada
                domicile: data.user.domicile || 'N/A', 
                birthDate: data.user.birthdate || 'N/A',
                phone: data.user.phone || 'N/A',
                weight: data.user.weight || 'N/A',
                height: data.user.height || 'N/A',
                bmi: data.user.bmi || 'N/A', // 
                dietPreference: data.user.dietPreference || 'N/A',
            };
            localStorage.setItem('userData', JSON.stringify(userData));

            // Notifikasi sukses
            alert('Login successful!');

            // Redirect ke halaman user profile
            window.location.href = 'home.html';
        } else {
            // Tampilkan pesan kesalahan
            alert(`Login failed: ${data.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
