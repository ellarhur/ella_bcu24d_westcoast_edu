import { getBookings, clearBookings } from '../models/localstorage.js';

window.onload = function () {
  const bookings = getBookings();
  const bookedCoursesDiv = document.getElementById('bookedCourses');

  if (bookings.length > 0 && bookedCoursesDiv) {
    bookings.forEach((booking, index) => {
      const courseDiv = document.createElement('div');
      courseDiv.innerHTML = `
                <h3>Kurs: ${booking.course}</h3>
                <p>Email: ${booking.email}</p>
                <p>Telefon: ${booking.number}</p>
                <p>Adress: ${booking.adress}</p>
                <p>Bokningstyp: ${booking.bookingType}</p>
                <hr>
            `;
      bookedCoursesDiv.appendChild(courseDiv);
    });
  } else {
    if (bookedCoursesDiv) {
      bookedCoursesDiv.innerHTML = '<p>Du har inga bokade kurser.</p>';
    }
  }
};

function logout() {
  clearBookings();
  window.location.href = 'index.html';
  console.log('hej');
}
