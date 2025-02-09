import { courses, listCourses } from '../models/courses.js';
// Hitta containern för kurserna
const coursesContainer = document.getElementById('popular-courses-container');
// Funktion för att skapa kurskort
function createPopularCourseCard(course) {
    const courseCard = document.createElement('div');
    courseCard.classList.add('popular-course-card');
    const courseImage = document.createElement('img');
    courseImage.src = course.image;
    courseImage.alt = course.title;
    const courseTitle = document.createElement('h3');
    courseTitle.textContent = course.title;
    const courseDescription = document.createElement('p');
    courseDescription.textContent = course.description;
    courseCard.appendChild(courseImage);
    courseCard.appendChild(courseTitle);
    courseCard.appendChild(courseDescription);
    return courseCard;
}
// Funktion för att rendera populära kurser
const renderPopularCourses = async () => {
    // Vänta på att listan med kurser är hämtad
    await listCourses();
    // Lägg till de fem första kurserna från arrayen
    courses.slice(0, 5).forEach(course => {
        const courseCard = createPopularCourseCard(course);
        coursesContainer.appendChild(courseCard);
    });
    // Lägg till en knapp som leder till alla kurser
    const allCoursesButton = document.createElement('button');
    allCoursesButton.textContent = 'Visa alla kurser';
    allCoursesButton.onclick = () => {
        window.location.href = 'courses.html'; // Ändra till rätt länk
    };
    coursesContainer.appendChild(allCoursesButton);
};
// Vänta tills DOM är helt laddad och sedan rendera populära kurser
document.addEventListener('DOMContentLoaded', renderPopularCourses);
