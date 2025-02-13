import { welcomeMessageAndName } from './accountNewUser.js'

document.addEventListener("DOMContentLoaded", () => {
    const app = document.body; // Vi lägger allt i body
    
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "Boka en kurs";
    header.appendChild(title);
    
    const userNameElement = document.createElement("p");
    userNameElement.id = "userName";
    userNameElement.textContent = "Välkommen!";
    header.appendChild(userNameElement);
    
    app.appendChild(header);

    // Skapa ett formulär
    const bookingForm = document.createElement("form");
    bookingForm.id = "bookingForm";

    // Skapa en label och en select för kurser
    const courseLabel = document.createElement("label");
    courseLabel.textContent = "Välj kurs:";
    const courseSelect = document.createElement("select");
    courseSelect.id = "course";

    bookingForm.appendChild(courseLabel);
    bookingForm.appendChild(courseSelect);

    // Lägg till övriga formulärfält (email, telefonnummer, adress)
    bookingForm.innerHTML += `
        <label for="email">Din email:</label>
        <input type="email" id="email" name="email" required>

        <label for="number">Ditt telefonnummer:</label>
        <input type="number" id="number" name="number" required>

        <label for="adress">Din faktureringsadress:</label>
        <input type="text" id="adress" name="adress" required>

        <div>
            <input type="radio" id="classroom" name="bookingType" value="classroom" required>
            <label for="classroom">På plats</label>

            <input type="radio" id="distance" name="bookingType" value="distance" required>
            <label for="distance">På distans</label>
        </div>

        <button type="submit">Boka kursen</button>
    `;

    app.appendChild(bookingForm);

    // Lista för bokningar
    const bookingsList = document.createElement("ul");
    bookingsList.id = "bookingsList";
    app.appendChild(document.createElement("h2")).textContent = "Mina bokningar";
    app.appendChild(bookingsList);

    // Funktion för att ladda kurser och fylla dropdown-listan
    async function loadCourses() {
        try {
            const response = await fetch("http://localhost:3000/courses");
            const courses = await response.json();

            // Loopar igenom varje kurs och lägger till en option
            courses.forEach(course => {
                const option = document.createElement("option");
                option.value = course.id;  // Kursens ID är värdet
                option.textContent = `${course.number} - ${course.title}`;  // Texten i dropdown-listan
                courseSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Kunde inte ladda kurser:", error);
        }
    }

    loadCourses();  // Ladda kurser när sidan är klar

    // Hantera bokningar
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || { bookings: [] };

        const selectedCourseId = parseInt(courseSelect.value);
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
            });
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
