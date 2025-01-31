import { fetchCourses } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
    if (document.getElementById("courses")) {
        try {
            const courses = await fetchCourses();
            const coursesContainer = document.getElementById("courses");
            courses.forEach(course => {
                const courseElement = document.createElement("div");
                courseElement.classList.add("course");
                courseElement.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <img src="${course.image}" alt="${course.title}" />
                `;
                courseElement.addEventListener("click", () => {
                    window.location.href = `course-details.html?id=${course.id}`;
                });
                coursesContainer.appendChild(courseElement);
            });
        } catch (error) {
            console.error("Fel vid hämtning av kurser:", error);
        }
    }
});