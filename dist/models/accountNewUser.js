const initApp = () => {
    console.log("Det här funkar!");
};

export function welcomeMessageAndName(newUser) {
    const userNameElement = document.querySelector("#userName");
    const welcomeMessageElement = document.querySelector("#welcomeMessage");

    if (userNameElement) {
        userNameElement.textContent = `${newUser.name}`;
    }

    if (welcomeMessageElement) {
        welcomeMessageElement.innerHTML = `
            <h2>Välkommen till Westcoast Education, ${newUser.name}!</h2>
            <p>Du kan nu börja boka kurser och se dem i din profil.</p>
        `;
    }

    console.log("New user account:", newUser);

    displayBookings(newUser);
}

function displayBookings(user) {
    const bookingsListElement = document.querySelector("#bookingsList");
    if (!bookingsListElement) return;

    bookingsListElement.innerHTML = "";

    if (user.bookings && user.bookings.length > 0) {
        const bookingsTitle = document.createElement("h3");
        bookingsTitle.textContent = "Nyligen bokade kurser:";
        bookingsListElement.appendChild(bookingsTitle);

        const list = document.createElement("ul");
        list.classList.add("bookings-list");

        user.bookings.forEach((booking, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("booking-item");

            listItem.innerHTML = `
                <span>${booking.courseName} - ${booking.teacher}</span>
                <button class="remove-booking-btn" data-index="${index}">Ta bort</button>
            `;

            list.appendChild(listItem);
        });

        bookingsListElement.appendChild(list);
    } else {
        bookingsListElement.innerHTML = "<p>Du har inga bokade kurser ännu.</p>";
    }
    

    document.querySelectorAll(".remove-booking-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            removeBooking(index);
        });
    });
}

function removeBooking(index) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || !loggedInUser.bookings) return;

    loggedInUser.bookings.splice(index, 1);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    displayBookings(loggedInUser);
}

document.addEventListener("DOMContentLoaded", () => {
    initApp();

    const storedUser = localStorage.getItem("loggedInUser");
    const newUser = storedUser ? JSON.parse(storedUser) : null;

    if (!newUser) {
        window.location.href = "log-sign.html";
        return;
    }

    welcomeMessageAndName(newUser);

    const bookingForm = document.querySelector("#bookingForm");
    const courseSelect = document.querySelector("#course");

    if (!bookingForm || !courseSelect) {
        console.error("Bokningsformulär eller kurslista hittades inte!");
        return;
    }

    async function loadCourses() {
        try {
            const response = await fetch("http://localhost:3000/courses");
            const courses = await response.json();

            courseSelect.innerHTML = "";
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
        const address = document.querySelector("#adress").value;
        const bookingType = document.querySelector("input[name='bookingType']:checked")?.value;

        if (!selectedCourseId) {
            alert("Vänligen välj en kurs.");
            return;
        }

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
                    address: address,
                    type: bookingType
                };

                loggedInUser.bookings.push(newBooking);
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

                displayBookings(loggedInUser);
                bookingForm.reset();
            })
            .catch(error => console.error("Fel vid hämtning av kurser:", error));
    });

    displayBookings(newUser);
});
