 // Hämta formuläret och fält
const loginForm = document.getElementById("loginForm");
const errorElement = document.getElementById("error");

// Simulerad användardata
const mockUser = {
  username: "admin",
  password: "password123"
};

// När formuläret skickas
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Hindrar sidan från att laddas om

  // Hämta användarnamn och lösenord från formuläret
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Kontrollera om inloggningsuppgifterna är korrekta
  if (username === mockUser.username && password === mockUser.password) {
    alert("Inloggning lyckades!");
    window.location.href = "dashboard.html"; // Skicka användaren till en ny sida
  } else {
    errorElement.textContent = "Fel användarnamn eller lösenord!";
  }
});

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        window.location.href = "admin.html"; // Skicka användaren vidare
      } else {
        const error = await response.json();
        errorElement.textContent = error.error;
      }
    } catch (err) {
      errorElement.textContent = "Ett tekniskt fel inträffade!";
    }
  });