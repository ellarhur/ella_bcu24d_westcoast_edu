import { login } from "./auth.js";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm")?.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        login(username, password);
    });
});