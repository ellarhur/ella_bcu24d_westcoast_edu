"use strict";
const loginForm = document.querySelector('.loginForm');
const registerForm = document.querySelector('.registerForm');
if (loginForm && registerForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const usernameLogin = document.getElementById('usernameLogin').value;
        const passwordLogin = document.getElementById('passwordLogin').value;
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u) => u.username === usernameLogin && u.password === passwordLogin);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'student.html';
        }
        else {
            document.getElementById('error').textContent = 'Fel användarnamn eller lösenord.';
        }
    });
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const usernameRegister = document.getElementById('usernameRegister').value;
        const passwordRegister = document.getElementById('passwordRegister').value;
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find((u) => u.username === usernameRegister)) {
            alert('Användarnamnet är redan taget.');
            return;
        }
        const user = { username: usernameRegister, password: passwordRegister, bookings: [] };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Ditt konto har skapats! Du kan nu logga in.');
        window.location.href = 'log-sign.html';
    });
}
const login = (email, password) => {
    const student = students.find(s => s.email === email && s.password === password);
    if (student) {
        localStorage.setItem("loggedInStudent", JSON.stringify(student));
        window.location.href = "/account.html"; // Skicka användaren till kontosidan
    }
    else {
        alert("Fel e-post eller lösenord!");
    }
};
