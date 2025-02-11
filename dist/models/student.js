"use strict";
document.getElementById('bookingForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!loggedInUser.username) {
        alert('Du måste vara inloggad för att boka en kurs.');
        return;
    }
    const course = document.getElementById('course').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const adress = document.getElementById('adress').value;
    const bookingType = document.querySelector('input[name="bookingType"]:checked').value;
    const booking = { course, email, number, adress, bookingType };
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let userIndex = users.findIndex((u) => u.username === loggedInUser.username);
    if (userIndex !== -1) {
        users[userIndex].bookings.push(booking);
        localStorage.setItem('users', JSON.stringify(users));
    }
    // Spara bokning under kursens lista för att lärare ska kunna se den
    let courseBookings = JSON.parse(localStorage.getItem(course) || '[]');
    courseBookings.push({ username: loggedInUser.username, ...booking });
    localStorage.setItem(course, JSON.stringify(courseBookings));
    alert('Kursen är bokad!');
    window.location.href = 'account.html';
});
