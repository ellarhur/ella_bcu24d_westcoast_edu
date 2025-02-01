const API_URL = "http://localhost:3000";

export async function fetchCourses() {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) throw new Error("Misslyckades att hämta kurser");
    return await response.json();
}

// Hämta en specifik kurs
export async function fetchCourseById(courseId) {
    const response = await fetch(`${API_URL}/courses/${courseId}`);
    if (!response.ok) throw new Error("Misslyckades att hämta kursen");
    return await response.json();
}

// Lägg till en ny kurs
export async function addCourse(courseData) {
    const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
    });
    return await response.json();
}

// Ta bort en kurs
export async function deleteCourse(courseId) {
    const response = await fetch(`${API_URL}/courses/${courseId}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Misslyckades att ta bort kursen");
}