const loginForm = document.querySelectorAll('.loginForm')[0];
const registerForm = document.querySelectorAll('.loginForm')[1];

console.log("loginForm:", loginForm);
console.log("registerForm:", registerForm);

if (loginForm && registerForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Inloggning formulär skickat!");

        const usernameLogin = (document.getElementById('usernameLogin') as HTMLInputElement).value;
        const passwordLogin = (document.getElementById('passwordLogin') as HTMLInputElement).value;

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

        if (storedUser && usernameLogin === storedUser.username && passwordLogin === storedUser.password) {
            window.location.href = 'student.html';
        } else {
            document.getElementById('error')!.textContent = 'Fel användarnamn eller lösenord.';
        }
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Registrering formulär skickat!");

        const usernameRegister = (document.getElementById('usernameRegister') as HTMLInputElement).value;
        const passwordRegister = (document.getElementById('passwordRegister') as HTMLInputElement).value;

        console.log('Försöker skapa konto med:', usernameRegister, passwordRegister);

        const user = {
            username: usernameRegister,
            password: passwordRegister
        };

        localStorage.setItem('user', JSON.stringify(user));

        alert('Ditt konto har skapats! Du kan nu logga in.');
        window.location.href = 'log-sign.html';
    });
} else {
    console.error('Formulär ej hittade i DOM!');
}
