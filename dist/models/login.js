const form = document.querySelector(".registerForm");

const initApp = () => {};

const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const username = data.get('username');
    const password = data.get('password');

};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);
