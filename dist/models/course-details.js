import { courses } from "../models/courses.js";
const initApp = () => {
    findCourse();
};
const findCourse = () => {
    const id = location.search.split("=")[1];
    const course = courses.find(c => c.id === +id);
    console.log(courses);
    if (course) {
        displayCourse(course);
    }
    else {
        displayError();
    }
};
const displayCourse = (course) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="course-details-top">
    <div>
    ${course.image ? `<img src="${course.image}" alt="${course.title}"/>`
        : ``}
        </div>
    </div>
    `;
    document.querySelector('#course-details')?.appendChild(div);
};
const displayError = () => { };
document.addEventListener('DOMContentLoaded', initApp);
