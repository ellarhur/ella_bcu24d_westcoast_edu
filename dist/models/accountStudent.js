import { courses } from '../data/courses.js';

const initApp = () => {
    console.log("Det här funkar!");
};


document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userNameElement = document.querySelector("#userName");
    const bookingsListElement = document.querySelector("#bookingsList");
    const bookingForm = document.querySelector("#bookingForm");
    const courseSelectElement = document.querySelector("#course");

 

    if (userNameElement) {
        userNameElement.textContent = `Välkommen, ${loggedInUser.name}`;
    }


    async function loadCourses() {
        try {
            const response = await fetch("http://localhost:3000/courses");
            courses = await response.json();
    
            courses.forEach(course => {
                const option = document.createElement("option");
                option.value = course.id;
                option.textContent = `${course.number} - ${course.title}`;
                courseSelectElement.appendChild(option);
            });
        } catch (error) {
            console.error("Kunde inte ladda kurser:", error);
        }
    }
    
    loadCourses();

    function displayBookings() {
        if (bookingsListElement) {
            bookingsListElement.innerHTML = "";
            if (loggedInUser.bookings && loggedInUser.bookings.length > 0) {
                loggedInUser.bookings.forEach(booking => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${booking.courseName} - ${booking.teacher}`;
                    bookingsListElement.appendChild(listItem);
                });
            } else {
                bookingsListElement.innerHTML = "<p>Inga bokade kurser.</p>";
            }
        }
    }

    displayBookings();

    if (bookingForm) {
        bookingForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const courseId = parseInt(document.querySelector("#course").value);
    const email = document.querySelector("#email").value;
    const number = document.querySelector("#number").value;
    const adress = document.querySelector("#adress").value;
    const bookingType = document.querySelector("input[name='bookingType']:checked")?.value;

    // Använd den globala allCourses för att hitta kursen
    const selectedCourse = courses.find(course => course.id === courseId);

    // Skapa en ny bokning
    const newBooking = {
        courseName: selectedCourse.title,
        email: email,
        teacher: selectedCourse.teacher,
        phone: number,
        address: adress,
        type: bookingType
    };

    // Lägg till bokningen i loggedInUser.bookings
    if (!loggedInUser.bookings) {
        loggedInUser.bookings = [];
    }
    loggedInUser.bookings.push(newBooking);

    // Uppdatera användarens data i localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    displayBookings();  // Uppdatera listan med bokningar
    bookingForm.reset();  // Återställ formuläret
});

        
    }
});
