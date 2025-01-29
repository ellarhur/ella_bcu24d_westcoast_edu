document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");

    if (!userRole) {
        alert("Du måste vara inloggad!");
        window.location.href = "login.html";
    } else {
        console.log(`Inloggad som ${userRole} (${userEmail})`);
    }
});

function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
}