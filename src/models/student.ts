import { saveBooking } from './localstorage';

document.getElementById('bookingForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const course = (document.getElementById('course') as HTMLSelectElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const number = (document.getElementById('number') as HTMLInputElement).value;
    const adress = (document.getElementById('adress') as HTMLInputElement).value;
    const bookingType = (document.querySelector('input[name="bookingType"]:checked') as HTMLInputElement).value;

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
