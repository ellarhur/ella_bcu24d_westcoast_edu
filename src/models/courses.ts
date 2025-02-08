import { courses } from '../data/courses.js';
import { ICourse } from '../models/ICourse.js'

const initApp = () => {
    console.log("Scriptet körs!");
    listCourses();
};
const listCourses = (): void => {
displayCourses(courses);
};

const displayCourses = (courses: Array<ICourse>) => {
    const app = document.querySelector("#courses") as HTMLDivElement;

    if (!app) {
        console.error("Elementet #courses hittades inte!");
        return;
    }

    app.innerHTML = '';


    for(let course of courses)  {
        const div = document.createElement('div');
        const imageAnchor = document.createElement('a');
        const image = document.createElement('img');
        const coursecardBody = document.createElement('div');
        const heading = document.createElement('h3');
        const p = document.createElement('p');
        const small = document.createElement('small');

        div.classList.add("coursecard");
        imageAnchor.href = `.pages/course-details.html?id=${course.id}`;
        image.alt = `${course.title}`;
        image.src = course.image 
        ? `/src/assets${course.image}` 
        : `/src/assets/default.jpg`;
        
        imageAnchor.appendChild(image);
        div.appendChild(imageAnchor);

        coursecardBody.classList.add('coursecard-body');
        heading.classList.add('coursecard-title');
        heading.textContent = course.title;

        const dateText = document.createElement('p');
        dateText.textContent = `Datum för kursen: ${course.dates}`;
        
        const classroomText = document.createElement('p');
        classroomText.textContent = `${course.classroom ? "Kursen hålls på plats" : "Kursen är endast online"}`;
        
        const priceText = document.createElement('p');
        priceText.textContent = `Kostnad: ${course.price}`;
        
        small.appendChild(dateText);
        small.appendChild(classroomText);
        small.appendChild(priceText);
        p.appendChild(small);

        coursecardBody.appendChild(heading);
        coursecardBody.appendChild(p);
        div.appendChild(coursecardBody);
        app.appendChild(div);

    }
};

document.addEventListener('DOMContentLoaded', initApp);