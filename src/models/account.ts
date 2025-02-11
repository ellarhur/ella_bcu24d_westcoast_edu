const loadAccount = () => {
    const studentData = localStorage.getItem("loggedInStudent");
    if (!studentData) {
        alert("Du är inte inloggad!");
        window.location.href = "/login.html";
        return;
    }

    const student = JSON.parse(studentData);
    document.querySelector("#studentName")!.textContent = student.name;

    const bookingsList = document.querySelector("#bookings") as HTMLDivElement;
    bookingsList.innerHTML = "";

    if (student.bookings.length === 0) {
        bookingsList.innerHTML = "<p>Du har inga bokade kurser.</p>";
        return;
    }

    student.bookings.forEach((booking: { courseId: string; courseName: string; teacher: string }) => {
        const div = document.createElement("div");
        div.classList.add("booking-card");
        div.innerHTML = `
            <h3>${booking.courseName}</h3>
            <p>Handledare: ${booking.teacher}</p>
            <small>Kurskod: ${booking.courseId}</small>
        `;
        bookingsList.appendChild(div);
    });
};

// Ladda kontosidan när den öppnas
document.addEventListener("DOMContentLoaded", loadAccount);