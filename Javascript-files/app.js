import { fetchCourses } from "./api.js";
import { login, logout } from "./auth.js";
import { fetchCourseById } from "./api.js";

// Funktion för att ladda kurser på startsidan
async function loadCourses() {
    const coursesContainer = document.getElementById("courses");
    if (!coursesContainer) return;

    try {
        const courses = await fetchCourses();
        coursesContainer.innerHTML = ""; // Rensa innehållet innan vi lägger till nytt

        courses.forEach(course => {
            const courseElement = document.createElement("div");
            courseElement.classList.add("course");
            courseElement.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <img src="${course.image}" alt="${course.title}" />
            `;
            courseElement.addEventListener("click", () => {
                window.location.href = `course-details.html?id=${course.id}`;
            });
            coursesContainer.appendChild(courseElement);
        });
    } catch (error) {
        console.error("Fel vid hämtning av kurser:", error);
    }
}

// Funktion för att ladda kursdetaljer på enskild kurssida
async function loadCourseDetails() {
    const courseContent = document.getElementById("course-content");
    if (!courseContent) return;

    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    if (!courseId) {
        courseContent.innerHTML = "<p>Ingen kurs vald.</p>";
        return;
    }

    try {
        const course = await fetchCourseById(courseId);
        document.getElementById("course-title").innerText = course.title;
        document.getElementById("course-number").innerText = `Kursnummer: ${course.number}`;
        document.getElementById("course-description").innerText = course.description;
        document.getElementById("course-days").innerText = `Antal dagar: ${course.days}`;
        document.getElementById("course-classroom").innerText = `Klassrum: ${course.classroom ? 'Ja' : 'Nej'}`;
        document.getElementById("course-online").innerText = `Online: ${course.online ? 'Ja' : 'Nej'}`;
        document.getElementById("course-dates").innerText = `Startdatum: ${course.dates.join(", ")}`;
        document.getElementById("course-image").src = course.image;
        document.getElementById("course-image").alt = course.title;
    } catch (error) {
        console.error("Fel vid hämtning av kursdetaljer:", error);
    }
}

// Funktion för att hantera inloggning
function setupLogin() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            login(username, password);
        });
    }
}

// Funktion för att hantera utloggning
function setupLogout() {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            logout();
        });
    }
}

// Initiera appen baserat på vilken sida vi är på
document.addEventListener("DOMContentLoaded", function () {
    loadCourses();
    loadCourseDetails();
    setupLogin();
    setupLogout();
});

const transactionDetailsDisplays = document.querySelector('')
import { fetchCourses } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
    if (document.getElementById("courses")) {
        try {
            const courses = await fetchCourses();
            const coursesContainer = document.getElementById("courses");
            courses.forEach(course => {
                const courseElement = document.createElement("div");
                courseElement.classList.add("course");
                courseElement.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <img src="${course.image}" alt="${course.title}" />
                `;
                courseElement.addEventListener("click", () => {
                    window.location.href = `course-details.html?id=${course.id}`;
                });
                coursesContainer.appendChild(courseElement);
            });
        } catch (error) {
            console.error("Fel vid hämtning av kurser:", error);
        }
    }
});