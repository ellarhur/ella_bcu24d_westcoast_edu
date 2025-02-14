import { NewStudent } from './newStudent.js';

// Funktion för att kolla om användaren finns i en specifik kategori (student eller lärare)
const checkIfUserExists = async (email, userType) => {
    const response = await fetch(`http://localhost:3000/${userType}`);
    const users = await response.json();
    
    return users.find(user => user.email === email);
};

// Funktion för att registrera ny student
const registerStudent = async (studentData) => {
    try {
        const existingUser = await checkIfUserExists(studentData.email, "students");
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
    // Hantera inloggning
    const studentLoginForm = document.querySelector("#studentLoginForm");
    
    if (studentLoginForm) {
        studentLoginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const email = document.querySelector("#usernameLogin").value;
            const password = document.querySelector("#passwordLogin").value;
            
            console.log("Försöker logga in med:", email, password);
            
            try {
                // Hämta användardata från både students och teachers
                const studentResponse = await fetch("http://localhost:3000/students");
                const teacherResponse = await fetch("http://localhost:3000/teachers");

                if (!studentResponse.ok || !teacherResponse.ok) {
                    throw new Error("Kunde inte hämta användardata");
                }

                const students = await studentResponse.json();
                const teachers = await teacherResponse.json();

                console.log("Hittade studenter:", students);
                console.log("Hittade lärare:", teachers);

                // Kontrollera om användaren är en student
                const student = students.find(user => user.email === email && user.password === password);
                
                // Kontrollera om användaren är en lärare
                const teacher = teachers.find(user => user.email === email && user.password === password);
                
                if (student) {
                    console.log("Student inloggad:", student);
                    localStorage.setItem("loggedInUser", JSON.stringify(student));
                    window.location.href = "accountStudent.html";
                } else if (teacher) {
                    console.log("Lärare inloggad:", teacher);
                    localStorage.setItem("loggedInTeacher", JSON.stringify(teacher));
                    window.location.href = "accountTeacher.html";
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
            
            // Skapa ett unikt ID
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
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#adminLoginForm").addEventListener("submit", adminLogin);
});

// 🔑 Funktion för att hantera inloggning för lärare
const adminLogin = async (e) => {
    e.preventDefault(); // Förhindrar sidans omladdning

    const email = document.querySelector("#adminEmail").value;
    const password = document.querySelector("#adminPassword").value;

    try {
        // Hämta lärare från databasen (ändra URL till din JSON-server)
        const response = await fetch("http://localhost:3000/teachers");
        const teachers = await response.json();

        // Kontrollera om användaren finns
        const teacher = teachers.find(t => t.email === email && t.password === password);

        if (teacher) {
            // Spara lärarens info i localStorage
            localStorage.setItem("loggedInTeacher", JSON.stringify(teacher));

            // Skicka vidare till accountTeacher.html
            window.location.href = "accountTeacher.html";
        } else {
            document.querySelector("#adminLoginError").textContent = "Fel e-post eller lösenord!";
        }
    } catch (error) {
        console.error("Fel vid inloggning:", error);
        document.querySelector("#adminLoginError").textContent = "Inloggningen misslyckades. Försök igen.";
    }
};
