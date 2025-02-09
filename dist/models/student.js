import { saveBooking } from './localstorage';
document.getElementById('bookingForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const course = document.getElementById('course').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const adress = document.getElementById('adress').value;
    const bookingType = document.querySelector('input[name="bookingType"]:checked').value;
    const booking = {
        course,
        email,
        number,
        adress,
        bookingType
    };
    saveBooking(booking);
    window.location.href = 'account.html';
});
