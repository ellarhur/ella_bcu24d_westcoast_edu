export function login(username, password) {
    if (username.includes("admin")) {
        localStorage.setItem("userRole", "admin");
        window.location.href = "admin.html";
    } else {
        localStorage.setItem("userRole", "student");
        window.location.href = "student.html";
    }
}

export function logout() {
    localStorage.removeItem("userRole");
    window.location.href = "login.html";
}