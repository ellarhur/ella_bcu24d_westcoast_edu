export const fetchCourses = async () => {
    try {
        const response = await fetch('http://localhost:3000/courses');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const courses = await response.json();
        return courses; // Returnerar kurserna istället för att logga ut dem direkt
    } catch (error) {
        console.error("Fel vid hämtning av kurser:", error);
        return [];
    }
};