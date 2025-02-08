import { teachers } from '../data/courses.js';
import { ITeacher } from '../models/ICourse.js'

const initApp = () => {
    console.log("Scriptet körs!");
    listTeachers();
};

const listTeachers = (): void => {
    displayTeachers(teachers);
};

const displayTeachers = (teachers: Array<ITeacher>) => {
    const app = document.querySelector("#teachers") as HTMLDivElement;

    if (!app) {
        console.error("Elementet #teachers hittades inte!");
        return;
    }

    app.innerHTML = '';

    for (let teacher of teachers)  {
        const div = document.createElement('div');
        const imageAnchor = document.createElement('a');
        const image = document.createElement('img');
        const teacherCardBody = document.createElement('div');
        const heading = document.createElement('h3');
        const p = document.createElement('p');
        const small = document.createElement('small');

        div.classList.add("teachercard");
        imageAnchor.href = `.pages/teacher-details.html?id=${teacher.id}`;
        image.alt = `${teacher.name}`;
        image.src = teacher.image 
            ? `/src/assets${teacher.image}` 
            : `/src/assets/default.jpg`;

        imageAnchor.appendChild(image);
        div.appendChild(imageAnchor);

        teacherCardBody.classList.add('teachercard-body');
        heading.classList.add('teachercard-title');
        heading.textContent = teacher.name;

        const dateText = document.createElement('p');
        dateText.textContent = `Tillgänglig från: ${teacher.availability}`;

        const classroomText = document.createElement('p');
        classroomText.textContent = `${teacher.location ? "Undervisning sker på plats" : "Undervisning sker online"}`;

        const priceText = document.createElement('p');
        priceText.textContent = `Kostnad: ${teacher.price}`;

        small.appendChild(dateText);
        small.appendChild(classroomText);
        small.appendChild(priceText);
        p.appendChild(small);

        teacherCardBody.appendChild(heading);
        teacherCardBody.appendChild(p);
        div.appendChild(teacherCardBody);
        app.appendChild(div);
    }
};

document.addEventListener('DOMContentLoaded', initApp);
