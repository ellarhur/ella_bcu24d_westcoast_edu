import { teachers } from '../data/teachers.js';
const initApp = () => {
    console.log("Det här funkar!");
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
        const descriptionText = document.createElement('p');
        const small = document.createElement('small');
        const hoverText = document.createElement('div');
        hoverText.classList.add('hover-text');
        hoverText.textContent = "Klicka på kortet för att logga in och ta kontakt med " + teacher.id;
        div.classList.add("teachercard");
        imageAnchor.href = `/src/pages/log-sign.html`;
        image.alt = `${teacher.id}`;
        image.src = teacher.image
            ? `/src/assets${teacher.image}`
            : `/src/assets/default.jpg`;
        imageAnchor.appendChild(image);
        div.appendChild(imageAnchor);
        teacherCardBody.classList.add('teachercard-body');
        heading.classList.add('teachercard-title');
        heading.textContent = teacher.id;
        descriptionText.textContent = teacher.description || "Ingen beskrivning tillgänglig";
        teacherCardBody.appendChild(heading);
        teacherCardBody.appendChild(descriptionText);
        div.appendChild(teacherCardBody);
        div.appendChild(hoverText);
        app.appendChild(div);
    }
};
document.addEventListener('DOMContentLoaded', initApp);
