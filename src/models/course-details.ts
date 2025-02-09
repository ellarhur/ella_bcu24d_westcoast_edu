import { courses, listCourses } from "../models/courses.js";
import { ICourse } from "../models/ICourse.js";

const initApp = () => {
    findCourse();
}

const findCourse = (): void => {
    const id = location.search.split("=")[1];
    const course = courses.find(c => c.id === +id);
    console.log(courses);

    if (course) {
    displayCourse(course);
    } else {
        displayError();
    }
};



const displayCourse = (course:ICourse) => {
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="course-details-top">
    <div>
    ${
        course.image ? `<img src="${course.image}" alt="${course.title}"/>`
        :``
    }
        </div>
    </div>
    `;

    document.querySelector('#course-details')?.appendChild(div);

};

const displayError = () => { };

document.addEventListener('DOMContentLoaded', initApp);