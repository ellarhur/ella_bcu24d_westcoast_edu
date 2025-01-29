// app.js
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("course-details.html")) {
    loadCourseDetails();
  } else {
    loadCourses();
  }
});

function loadCourses() {
  fetch("db.json")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const coursesContainer = document.getElementById("courses");
      if (!coursesContainer) return;

      data.forEach(course => {
        const courseElement = document.createElement("div");
        courseElement.classList.add("course");
        courseElement.innerHTML = `
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <img src="${course.image}" alt="${course.title}" />
        `;

        courseElement.addEventListener("click", () => {
          window.location.href = `course-details.html?id=${course.id}`;
        });

        coursesContainer.appendChild(courseElement);
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      const coursesContainer = document.getElementById("courses");
      if (coursesContainer) {
        coursesContainer.innerHTML = "<p>Det gick inte att ladda kurserna. Försök igen senare.</p>";
      }
    });
}

function loadCourseDetails() {
  const params = new URLSearchParams(window.location.search);
  const courseId = parseInt(params.get("id")); // Convert to number

  if (!courseId) {
    document.getElementById("course-content").innerHTML = "<p>Ingen kurs vald.</p>";
    return;
  }

  fetch("/db.json")

  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const course = data.find(c => c.id === courseId); // Using strict equality

      if (!course) {
        document.getElementById("course-content").innerHTML = "<p>Kursen hittades inte.</p>";
        return;
      }

      // Update all elements if they exist
      const elements = {
        'course-title': course.title,
        'course-number': `Kursnummer: ${course.number}`,
        'course-description': course.description,
        'course-days': `Antal dagar: ${course.days}`,
        'course-classroom': `Klassrum: ${course.classroom ? 'Ja' : 'Nej'}`,
        'course-online': `Online: ${course.online ? 'Ja' : 'Nej'}`,
        'course-dates': `Startdatum: ${course.dates.join(", ")}`
      };

      Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
          element.innerText = value;
        }
      });

      // Handle image separately
      const imageElement = document.getElementById("course-image");
      if (imageElement) {
        imageElement.src = course.image;
        imageElement.alt = course.title;
      }
    })
    .catch(error => {
      console.error("Error loading course details:", error);
      document.getElementById("course-content").innerHTML = 
        "<p>Det gick inte att ladda kursinformationen. Försök igen senare.</p>";
    });
}
console.log("JavaScript är laddat!");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM är laddad!");
    if (window.location.pathname.includes("course-details.html")) {
        console.log("På course-details sidan!");
        loadCourseDetails();
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForms = document.querySelectorAll(".loginForm");

  loginForms.forEach(form => {
      form.addEventListener("submit", function (event) {
          event.preventDefault(); // Hindra standardformuläret från att skickas

          // Hämta användarnamn och lösenord från formuläret
          const username = form.querySelector("input[name='username']").value;
          const password = form.querySelector("input[name='password']").value;

          // Enkel kontroll (kan bytas ut mot en riktig autentisering)
          if (username.includes("admin")) {
              window.location.href = "admin.html"; // Skickar admin till admin.html
          } else {
              window.location.href = "student.html"; // Skickar studenter till student.html
          }
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const courseList = document.getElementById("courseList");

  // Hämta kurser från db.json (simulerad fetch från en lokal JSON-fil)
  fetch("db.json")  
      .then(response => response.json())
      .then(courses => {
          courses.forEach(course => {
              const courseItem = document.createElement("div");
              courseItem.classList.add("course-item");

              // Kursens titel (klickbar för att expandera)
              const courseHeader = document.createElement("h3");
              courseHeader.textContent = `${course.title} (${course.number})`;
              courseHeader.classList.add("course-title");
              courseHeader.style.cursor = "pointer";

              // Dold kursinformation
              const courseDetails = document.createElement("div");
              courseDetails.classList.add("course-details");
              courseDetails.style.display = "none";

              // Kursbeskrivning
              const courseDesc = document.createElement("p");
              courseDesc.textContent = course.description;

              // Kursbild
              const courseImage = document.createElement("img");
              courseImage.src = course.image;
              courseImage.alt = `Bild för kursen ${course.title}`;
              courseImage.classList.add("course-image");

              // Lista på registrerade elever
              const studentList = document.createElement("ul");
              studentList.classList.add("student-list");
              course.students.forEach(student => {
                  const studentItem = document.createElement("li");
                  studentItem.textContent = student;
                  studentList.appendChild(studentItem);
              });

              // Lägg till allt i DOM-strukturen
              courseDetails.appendChild(courseImage);
              courseDetails.appendChild(courseDesc);
              courseDetails.appendChild(document.createElement("h4")).textContent = "Registrerade elever:";
              courseDetails.appendChild(studentList);
              courseItem.appendChild(courseHeader);
              courseItem.appendChild(courseDetails);
              courseList.appendChild(courseItem);

              // Klickhändelse för att visa/dölja kursinformation
              courseHeader.addEventListener("click", () => {
                  courseDetails.style.display = (courseDetails.style.display === "none") ? "block" : "none";
              });
          });
      })
      .catch(error => console.error("Fel vid hämtning av kurser:", error));
});