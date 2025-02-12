const initApp = () => {
    console.log("Det här funkar!");
};

document.addEventListener("DOMContentLoaded", () => {
    const newUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!newUser) {
        window.location.href = "log-sign.html";
        return;
    }

    const userNameElement = document.querySelector("#userName");
    const welcomeMessageElement = document.querySelector("#welcomeMessage");
    
    if (userNameElement) {
        userNameElement.textContent = `${newUser.name}`;
    }
    
    if (welcomeMessageElement) {
        welcomeMessageElement.innerHTML = `
            <h2>Välkommen till Westcoast Education!</h2>
            <p>Ditt konto har skapats framgångsrikt.</p>
            <p>E-postadress: ${newUser.email}</p>
            <p>Du kan nu börja boka kurser och se dem i din profil.</p>
        `;
    }
    
    console.log("New user account:", newUser);
    
    const bookingsListElement = document.querySelector("#bookingsList");
    
    if (bookingsListElement) {
        if (newUser.bookings && newUser.bookings.length > 0) {
            bookingsListElement.innerHTML = "<h3>Dina bokade kurser:</h3>";
            newUser.bookings.forEach(booking => {
                const listItem = document.createElement("li");
                listItem.textContent = `${booking.courseName} - ${booking.teacher}`;
                bookingsListElement.appendChild(listItem);
            });
        } else {
            bookingsListElement.innerHTML = "<p>Du har inga bokade kurser ännu. <a href='courses.html'>Se våra tillgängliga kurser</a>.</p>";
        }
    }
});