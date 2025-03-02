import { courses } from '../data/courses.js';
const initApp = () => {
    findCourse();
};
const findCourse = () => {
    const id = location.search.split('=')[1];
    const course = courses.find((c) => c.id === +id);
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
    ${course.image
        ? `<img src="/src/assets/${course.image}" alt="${course.title}"/>`
        : ``}
        </div>
        <div class="info">
        <h2>${course.title}</h2>
        <h3>Lärare i kursen är ${course.teacher} </h3>
                <p>${course.description}<br />
        Datum för kursen är: <b>${course.dates}</b> och är alltså totalt ${course.days} dagar lång<br />

     ${course.classroom
        ? 'Kursen hålls på  <b>plats</b> & kan ses i  <b>efterhand online </b>'
        : 'Kursen är  <b>endast online </b>'}<br />
     Elever som går den här kursen får snittbetyget: <b>${course.average}</b><br />
     Priset för kursen är <b>${course.price}</b></p>
        </div>
    </div>
    `;
    document.querySelector('#course-details')?.appendChild(div);
};
const displayError = () => { };
console.log('hej');
document.addEventListener('DOMContentLoaded', initApp);