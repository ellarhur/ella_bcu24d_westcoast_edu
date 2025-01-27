// fetch för att hämta data från db.json
fetch('../db.json')  // Gå en nivå upp från src-mappen för att hämta db.json
  .then(response => {
    if (response.ok) {
      return response.json();  // Om svaret är bra, konvertera till JSON
    } else {
      throw new Error('Något gick fel med att hämta JSON.');
    }
  })
  .then(data => {
    // När vi har datan, logga ut den i konsolen
    console.log(data);

    // Hämta elementet där vi vill visa kursdata
    const coursesContainer = document.getElementById('courses');
    
    // Iterera genom kurserna och skapa HTML för varje kurs
    data.forEach(course => {
      const courseElement = document.createElement('div');
      courseElement.classList.add('course');
      courseElement.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <img src="${course.image}" alt="${course.title}" />
      `;
      coursesContainer.appendChild(courseElement);  // Lägg till kursen i HTML
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);  // Logga eventuella fel
  });