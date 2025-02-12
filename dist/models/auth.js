import { NewStudent } from './newStudent.js';

const checkIfUserExists = async (username) => {
    const response = await fetch("http://localhost:3000/students");
    const students = await response.json();
    
    return students.find(student => student.username === username); 
};
const registerStudent = async (studentData) => {
    try {
        const existingUser = await checkIfUserExists(studentData.username);
        if (existingUser) {
            console.log("Användarnamnet finns redan! Försök med ett annat.");
            alert("Användarnamnet är redan taget, försök med ett annat.");
            return;
        }

        const response = await fetch("http://localhost:3000/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();
        console.log("Student skapad:", result);

        localStorage.setItem("loggedInUser", JSON.stringify(result));

        window.location.href = "account.html";
    } catch (error) {
        console.error("Fel vid skapande av student:", error);
    }
};
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".loginForm");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.querySelector("#usernameLogin").value;
        const password = document.querySelector("#passwordLogin").value;

        try {
            const response = await fetch("http://localhost:3000/students");
            if (!response.ok) throw new Error("Kunde inte hämta användardata");

            const students = await response.json();
            const user = students.find(student => student.username === username && student.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));

                window.location.href = "account.html";
            } else {
                alert("Fel användarnamn eller lösenord.");
            }
        } catch (error) {
            console.error("Fel vid inloggning:", error);
            alert("Något gick fel, försök igen.");
        }
    });
});
