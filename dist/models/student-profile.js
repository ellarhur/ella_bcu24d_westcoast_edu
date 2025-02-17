export const getStudentData = async (studentId) => {
    try {
        const response = await fetch(`http://localhost:3000/students/${studentId}`);
        if (!response.ok)
            return null;
        return await response.json();
    }
    catch (error) {
        console.error("Fel vid hämtning av studentdata:", error);
        return null;
    }
};
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get("id");
    if (!studentId) {
        alert("Ingen student-ID hittades!");
        window.location.href = "index.html";
        return;
    }
    const student = await getStudentData(studentId);
    if (!student) {
        alert("Studenten hittades inte!");
        window.location.href = "index.html";
        return;
    }
    document.querySelector("#studentName").textContent = student.name;
    document.querySelector("#studentEmail").textContent = student.email;
    document.querySelector("#messageButton").addEventListener("click", () => {
        alert(`Meddelande skickat till ${student.name}!`);
    });
    document.querySelector("#backButton").addEventListener("click", () => {
        window.history.back();
    });
});
