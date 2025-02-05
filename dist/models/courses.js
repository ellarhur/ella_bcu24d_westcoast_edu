"use strict";
fetch('../db.json')
    .then(response => response.json()) // Omvandlar JSON från servern
    .then(data => {
    console.log('Hämtad data:', data); // Kolla om datan hämtas korrekt
    const courses = data.courses; // Hämta kurslistan från JSON
    const coursesContainer = document.getElementById('courses'); // Hämta div för kurserna
    if (!coursesContainer) {
        console.error('Elementet för kurserna hittades inte!');
        return;
    }
    // Loopa genom alla kurser och skapa HTML för varje kurs
    courses.forEach(course => {
        // Skapa en ny div för varje kurs
        const courseElement = document.createElement('div');
        courseElement.classList.add('course');
        // Lägg till kursinnehåll
        courseElement.innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="course-image">
        <h2>${course.title}</h2>
        <p><strong>Kursnummer:</strong> ${course.number}</p>
        <p><strong>Beskrivning:</strong> ${course.description}</p>
        <p><strong>Lärare:</strong> ${course.teacher}</p>
      `;
        // Lägg till kursen i courses-container
        coursesContainer.appendChild(courseElement);
    });
})
    .catch(error => {
    console.error("Det gick inte att hämta kurser från db.json:", error);
});
