document.querySelector('.login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showErrorPopup('Email and password are required.');
        return;
    }

    try {
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
            const userData = {
                name: data.user.name,
                email: data.user.email,
                sex: data.user.sex || 'N/A',
                domicile: data.user.domicile || 'N/A',
                birthDate: data.user.birthdate || 'N/A',
                phone: data.user.phone || 'N/A',
                weight: data.user.weight || 'N/A',
                height: data.user.height || 'N/A',
                bmi: data.user.bmi || 'N/A',
                dietPreference: data.user.dietPreference || 'N/A',
            };
            localStorage.setItem('userData', JSON.stringify(userData));

            showPopup(); // Tampilkan pop-up sukses
        } else {
            // Tampilkan pop-up error dengan pesan dari server
            showErrorPopup(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Tampilkan pop-up error untuk kesalahan jaringan
        showErrorPopup('An error occurred. Please try again.');
    }
});
