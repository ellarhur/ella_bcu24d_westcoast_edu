document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    const userNameElement = document.querySelector("#userName");
    const bookingsListElement = document.querySelector("#bookingsList");

    if (userNameElement) {
        userNameElement.textContent = `Välkommen, ${loggedInUser.name}`;
    }

    if (bookingsListElement && loggedInUser.bookings) {
        loggedInUser.bookings.forEach(booking => {
            const listItem = document.createElement("li");
            listItem.textContent = `${booking.courseName} - ${booking.teacher}`;
            bookingsListElement.appendChild(listItem);
        });
    }
});

    const bookedCoursesDiv = document.querySelector("#bookedCourses");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    console.log("LoggedInUser:", loggedInUser);

    console.log("Är min scripttagg rätt?");

    const loadBookedCourses = async () => {
        const response = await fetch(`http://localhost:3000/students/${loggedInUser.id}`);
        
        if (!response.ok) {
            console.error("Fel vid hämtning av studentdata:", response.statusText);
            return;
        }

        const studentData = await response.json();

        bookedCoursesDiv.innerHTML = studentData.courses.length > 0 
            ? studentData.courses.map(course => `<p>${course}</p>`).join("")
            : "<p>Inga bokade kurser.</p>";
    };

    await loadBookedCourses();

    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const selectedCourse = document.querySelector("#course").value;
        loggedInUser.courses.push(selectedCourse);

        await fetch(`http://localhost:3000/students/${loggedInUser.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courses: loggedInUser.courses }),
        });

        await loadBookedCourses();
    });
