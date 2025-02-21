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
    teachers.forEach(teacher => {
        const teacherCard = createTeacherCard(teacher);
        app.appendChild(teacherCard);
    });
};
const createTeacherCard = (teacher) => {
    const div = document.createElement('div');
    div.classList.add("teachercard");
    const imageAnchor = document.createElement('a');
    imageAnchor.href = `/src/pages/log-sign.html`;
    const image = document.createElement('img');
    image.alt = `Bild på ${teacher.id}`;
    image.src = teacher.image
        ? `/src/assets${teacher.image}`
        : `/src/assets/default.jpg`;
    imageAnchor.appendChild(image);
    div.appendChild(imageAnchor);
    const teacherCardBody = document.createElement('div');
    teacherCardBody.classList.add('teachercard-body');
    const heading = document.createElement('h3');
    heading.classList.add('teachercard-title');
    heading.textContent = teacher.id;
    const descriptionText = document.createElement('p');
    descriptionText.textContent = teacher.description || "Ingen beskrivning tillgänglig";
    teacherCardBody.appendChild(heading);
    teacherCardBody.appendChild(descriptionText);
    div.appendChild(teacherCardBody);
    const hoverText = document.createElement('div');
    hoverText.classList.add('hover-text');
    hoverText.textContent = `Klicka på kortet för att logga in och ta kontakt med ${teacher.id}`;
    div.appendChild(hoverText);
    return div;
};
document.addEventListener('DOMContentLoaded', initApp);