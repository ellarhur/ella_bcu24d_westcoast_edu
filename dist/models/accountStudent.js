import { welcomeMessageAndName } from "./accountNewUser.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.body;
    const bookingForm = document.querySelector("#bookingForm");
    const courseSelect = document.querySelector("#course");

    const bookingsList = document.createElement("ul");
    bookingsList.id = "bookingsList";
    app.appendChild(document.createElement("h2")).textContent = "Mina bokningar";
    app.appendChild(bookingsList);

    async function loadCourses() {
        try {
            const response = await fetch("http://localhost:3000/courses");
            const courses = await response.json();

            courses.forEach(course => {
                const option = document.createElement("option");
                option.value = course.id;
                option.textContent = `${course.number} - ${course.title}`;
                courseSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Kunde inte ladda kurser:", error);
        }
    }

    loadCourses();

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || { bookings: [] };

        const selectedCourseId = courseSelect.value;
        const email = document.querySelector("#email").value;
        const number = document.querySelector("#number").value;
        const adress = document.querySelector("#adress").value;
        const bookingType = document.querySelector("input[name='bookingType']:checked")?.value;

        fetch("http://localhost:3000/courses")
            .then(response => response.json())
            .then(courses => {
                const selectedCourse = courses.find(course => course.id === selectedCourseId);

                if (!selectedCourse) {
                    console.error("Kursen hittades inte");
                    return;
                }

                const newBooking = {
                    courseName: selectedCourse.title,
                    email: email,
                    teacher: selectedCourse.teacher,
                    phone: number,
                    address: adress,
                    type: bookingType
                };

                loggedInUser.bookings.push(newBooking);
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

                displayBookings();
                bookingForm.reset();
            })
            .catch(error => console.error("Fel vid hämtning av kurser:", error));
    });

    function displayBookings() {
        bookingsList.innerHTML = "";
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || { bookings: [] };

        if (loggedInUser.bookings.length > 0) {
            loggedInUser.bookings.forEach(booking => {
                const listItem = document.createElement("li");
                listItem.textContent = `${booking.courseName} - ${booking.teacher}`;
                bookingsList.appendChild(listItem);
            });
        } else {
            bookingsList.innerHTML = "<p>Inga bokade kurser.</p>";
        }
    }

    displayBookings();
});