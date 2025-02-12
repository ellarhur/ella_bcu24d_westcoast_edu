import { NewStudent } from "../models/newStudent.js";

const form = document.querySelector(".registerForm");

const initApp = () => {};

const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const username = data.get('username');
    const password = data.get('password');


    const user = new NewStudent(username,password);
    console.log(user);
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);
