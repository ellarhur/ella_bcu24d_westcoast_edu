import { fetchCourseById } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
    if (!document.getElementById("course-content")) return;

    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    if (!courseId) {
        document.getElementById("course-content").innerHTML = "<p>Ingen kurs vald.</p>";
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
});