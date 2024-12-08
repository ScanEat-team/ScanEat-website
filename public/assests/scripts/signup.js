async function submitSignup() {
    try {
      const response = await fetch('https://scaneats-cc-server-gonlxn2arq-et.a.run.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'jalan'
        },
        body: JSON.stringify({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          sex: document.getElementById('sex').value,
          birthdate: document.getElementById('dob').value,
          weight: parseFloat(document.getElementById('weight').value),
          height: parseFloat(document.getElementById('height').value),
          dietPreference: document.getElementById('diet-preference').value
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      alert('Registration successful!');
      window.location.href = 'login.html';
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('An error occurred. Please try again.');
    }
  }
  

// Fungsi untuk mengganti ke formulir kedua
function showOtherForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('other-form').style.display = 'block';
}
