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
        const cardBody = document.createElement('div');
        const heading = document.createElement('h5');
        const p = document.createElement('p');
        const small = document.createElement('small');

        div.classList.add("card");
        imageAnchor.href = `.pages/course-details.html?id=${course.id}`;
        image.alt = `${course.title}`;
        image.src = course.image 
        ? `/src/assets${course.image}` 
        : '/src/assets/default.png';
        // imageAnchor.appendChild(image);
        // div.appendChild(imageAnchor);
        // app.appendChild(div);
        
    }
};

document.addEventListener('DOMContentLoaded', initApp);