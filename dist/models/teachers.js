import { teachers } from '../data/teachers.js';
const initApp = () => {
    console.log("Scriptet körs!");
    listTeachers();
};
const listTeachers = () => {
    displayTeachers(teachers);
};
const displayTeachers = (teachers) => {
    const app = document.querySelector("#teachers");
    if (!app) {
        console.error("Elementet #teachers hittades inte!");
        return;
    }
    app.innerHTML = '';
    for (let teacher of teachers) {
        const div = document.createElement('div');
        const imageAnchor = document.createElement('a');
        const image = document.createElement('img');
        const teacherCardBody = document.createElement('div');
        const heading = document.createElement('h3');
        const descriptionText = document.createElement('p'); // Skapa ett element för beskrivningen
        const small = document.createElement('small');
        div.classList.add("teachercard");
        imageAnchor.href = `.pages/teacher-details.html?id=${teacher.name}`;
        image.alt = `${teacher.name}`;
        image.src = teacher.image
            ? `/src/assets${teacher.image}`
            : `/src/assets/default.jpg`;
        imageAnchor.appendChild(image);
        div.appendChild(imageAnchor);
        teacherCardBody.classList.add('teachercard-body');
        heading.classList.add('teachercard-title');
        heading.textContent = teacher.name;
        descriptionText.textContent = teacher.description || "Ingen beskrivning tillgänglig"; // Säkerställ att det finns en beskrivning
        teacherCardBody.appendChild(heading);
        teacherCardBody.appendChild(descriptionText);
        div.appendChild(teacherCardBody);
        app.appendChild(div);
    }
};
document.addEventListener('DOMContentLoaded', initApp);
