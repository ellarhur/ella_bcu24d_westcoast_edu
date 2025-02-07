export const createCourseCard = (course, detailsPage) => {
    const card = document.createElement('div');
    card.classList.add('course-card');
  
    card.innerHTML = `
      <img src="${course.image}" alt="${course.title}">
      <h3>${course.title} (${course.number})</h3>
      <p><strong>Lärare:</strong> ${course.teacher}</p>
      <p><strong>Antal dagar:</strong> ${course.days}</p>
      <p><strong>Pris:</strong> ${course.price}</p>
      <p><strong>Beskrivning:</strong> ${course.description}</p>
      <button onclick="window.location.href='${detailsPage}?id=${course.id}'">Läs mer</button>
    `;
  
    return card;
  };
  
  export const displayNotFoundMessage = (message) => {
    const app = document.querySelector('#courses');
    app.innerHTML = `<p class="not-found">${message}</p>`;
  };
  
  export const hideNotFoundMessage = () => {
    const notFound = document.querySelector('.not-found');
    if (notFound) notFound.remove();
  };
  