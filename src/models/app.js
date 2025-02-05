import { fetchCourses } from './api.js';

const loadCourses = async () => {
    const courses = await fetchCourses();
    console.log("Kurser hämtade:", courses);
};

loadCourses();