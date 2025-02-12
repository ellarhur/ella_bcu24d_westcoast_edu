import { NewStudent } from './newStudent.js';

// Funktion för att kolla om användaren finns
const checkIfUserExists = async (email) => {
    const response = await fetch("http://localhost:3000/students");
    const students = await response.json();
    
    return students.find(student => student.email === email);
};

// Funktion för att registrera ny student
const registerStudent = async (studentData) => {
    try {
        const existingUser = await checkIfUserExists(studentData.email);
        if (existingUser) {
            console.log("E-postadressen finns redan! Försök med en annan.");
            alert("E-postadressen är redan registrerad, försök med en annan.");
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
        
        window.location.href = "accountNewUser.html";
    } catch (error) {
        console.error("Fel vid skapande av student:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Hantera studentinloggning
    const studentLoginForm = document.querySelector("#studentLoginForm");
    
    if (studentLoginForm) {
        studentLoginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const email = document.querySelector("#usernameLogin").value;
            const password = document.querySelector("#passwordLogin").value;
            
            console.log("Attempting login with:", email, password);
            
            try {
                const response = await fetch("http://localhost:3000/students");
                if (!response.ok) throw new Error("Kunde inte hämta användardata");
                
                const students = await response.json();
                console.log("Found students:", students);
                
                const user = students.find(student => student.email === email && student.password === password);
                console.log("Matched user:", user);
                
                if (user) {
                    localStorage.setItem("loggedInUser", JSON.stringify(user));
                    window.location.href = "accountStudent.html";
                } else {
                    alert("Fel e-postadress eller lösenord.");
                }
            } catch (error) {
                console.error("Fel vid inloggning:", error);
                alert("Något gick fel, försök igen.");
            }
        });
    }

    // Hantera registrering
    const registerForm = document.querySelector(".registerForm");
    
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const name = document.querySelector("#nameRegister").value;
            const email = document.querySelector("#emailRegister").value;
            const password = document.querySelector("#passwordRegister").value;
            
            // Skapa ett unikt ID (enkel metod, i produktion skulle du använda något mer robust)
            const id = `student${Date.now()}`;
            
            const newStudent = {
                id,
                name,
                email,
                password,
                bookings: []
            };
            
            await registerStudent(newStudent);
        });
    }
});