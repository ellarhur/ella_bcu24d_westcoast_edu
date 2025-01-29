document.getElementById("addCourseForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Stoppar sidan från att laddas om

    // Hämta värden från formuläret
    const title = document.getElementById("title").value;
    const number = document.getElementById("number").value;
    const description = document.getElementById("description").value;
    const days = parseInt(document.getElementById("days").value);
    const dates = document.getElementById("dates").value.split(",").map(date => date.trim());
    const classroom = document.getElementById("classroom").checked;
    const online = document.getElementById("online").checked;
    const students = document.getElementById("students").value ? document.getElementById("students").value.split(",").map(student => student.trim()) : [];

    // Skapa kursobjekt
    const newCourse = {
        title,
        number,
        description,
        days,
        dates,
        classroom,
        online,
        students,
        image: "images/default.png" // Placeholder-bild
    };

    // Skicka kursen till JSON-servern
    try {
        const response = await fetch("http://localhost:3000/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCourse)
        });

        if (response.ok) {
            alert("Kurs tillagd!");
            document.getElementById("addCourseForm").reset(); // Rensa formuläret
        } else {
            alert("Något gick fel. Försök igen.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});