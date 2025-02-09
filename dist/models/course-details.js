const initCourseDetails = async () => {
    console.log("Laddar kursdetaljer...");
    // Hämta kurs-ID från URL:en
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");
    if (!courseId) {
        console.error("Inget kurs-ID hittades i URL:en!");
        return;
    }
    // Hämta kursdetaljer
    const url = `http://localhost:3000/courses/${courseId}`;
    const result = await fetch(url);
    if (!result.ok) {
        console.error("Misslyckades att hämta kursinformationen.");
        return;
    }
    const course = (await result.json());
    displayCourseDetails(course);
};
const displayCourseDetails = (course) => {
    const app = document.querySelector("#course-details");
    if (!app) {
        console.error("Elementet #course-details hittades inte!");
        return;
    }
    app.innerHTML = `
        <div class="course-details-card">
            <img src="${course.image ? `/src/assets${course.image}` : '/src/assets/default.jpg'}" alt="${course.title}">
            <h1>${course.title}</h1>
            <p><strong>Kursnummer:</strong> ${course.number}</p>
            <p><strong>Datum:</strong> ${course.dates.join(', ')}</p>
            <p><strong>Längd:</strong> ${course.days} dagar</p>
            <p><strong>Plats:</strong> ${course.classroom ? "På plats" : "Endast online"}</p>
            <p><strong>Pris:</strong> ${course.price} SEK</p>
            <p><strong>Lärare:</strong> ${course.teacher}</p>
            <p><strong>Beskrivning:</strong> ${course.description}</p>
            <p><strong>Antal studenter:</strong> ${course.students.length}</p>
            <p><strong>Snittbetyg:</strong> ${course.average}</p>
            <a href="/index.html">Tillbaka</a>
        </div>
    `;
};
// Kör funktionen när sidan laddas
document.addEventListener("DOMContentLoaded", initCourseDetails);
export {};
