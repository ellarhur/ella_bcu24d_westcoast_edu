export function saveBooking(booking: any): void {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

export function getBookings(): any[] {
  const bookings = localStorage.getItem('bookings');
  return bookings ? JSON.parse(bookings) : [];
}

export function clearBookings(): void {
  localStorage.removeItem('bookings');
}
