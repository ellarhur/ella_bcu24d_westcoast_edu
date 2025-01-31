
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("course-details.html")) {
    loadCourseDetails();
  } else {
    loadCourses();
  }
});

function loadCourses() {
  fetch("../db.json")
    .then(response => {
      if (!response.ok) {
        throw new Error('Något fick fel.');
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
      console.error("Fel på fetch:", error);
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

  fetch("../db.json")

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
  fetch("../db.json")  
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

function deleteCourse(courseId) {
  fetch(`/api/courses/${courseId}`, {
      method: 'DELETE',
  })
  .then(response => {
      if (response.ok) {
          // Ta bort kursen från DOM:en
          const courseElement = document.querySelector(`[data-course-id="${courseId}"]`);
          courseElement?.remove();
      } else {
          throw new Error('Kunde inte ta bort kursen');
      }
  })
  .catch(error => console.error('Fel vid borttagning:', error));
}

// Funktion för att uppdatera kursschema
function updateCourseSchedule(courseId, newDates) {
  fetch(`/api/courses/${courseId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dates: newDates })
  })
  .then(response => response.json())
  .then(updatedCourse => {
      // Uppdatera UI:n med nya datum
      const dateDisplay = document.querySelector(`[data-course-id="${courseId}"] .course-dates`);
      if (dateDisplay) {
          dateDisplay.textContent = `Kursdatum: ${updatedCourse.dates.join(', ')}`;
      }
  })
  .catch(error => console.error('Fel vid uppdatering:', error));
}

// Funktion för att lägga till ny lärare
function addTeacher(teacherData) {
  fetch('/api/teachers', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherData)
  })
  .then(response => response.json())
  .then(newTeacher => {
      // Uppdatera lärarväljaren i formuläret
      const teacherSelect = document.getElementById('teacher');
      const option = document.createElement('option');
      option.value = newTeacher.id;
      option.textContent = newTeacher.name;
      teacherSelect.appendChild(option);
  })
  .catch(error => console.error('Fel vid lägg till lärare:', error));
}

// Funktion för att hantera elever
function manageStudent(action, studentData) {
  const endpoint = action === 'add' ? '/api/students' : `/api/students/${studentData.id}`;
  const method = action === 'add' ? 'POST' : action === 'update' ? 'PUT' : 'DELETE';

  fetch(endpoint, {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: method !== 'DELETE' ? JSON.stringify(studentData) : undefined
  })
  .then(response => response.json())
  .then(data => {
      updateStudentList();
  })
  .catch(error => console.error('Fel vid studenthantering:', error));
}

// Funktion för att uppdatera studentlistan i UI:n
function updateStudentList() {
  fetch('/api/students')
      .then(response => response.json())
      .then(students => {
          const studentList = document.getElementById('studentList');
          studentList.innerHTML = '';
          students.forEach(student => {
              const studentElement = document.createElement('div');
              studentElement.classList.add('student-item');
              studentElement.innerHTML = `
                  <h4>${student.name}</h4>
                  <p>Email: ${student.email}</p>
                  <p>Registrerade kurser: ${student.courses.join(', ')}</p>
                  <button onclick="manageStudent('delete', {id: '${student.id}'})">Ta bort</button>
                  <button onclick="editStudent('${student.id}')">Redigera</button>
              `;
              studentList.appendChild(studentElement);
          });
      })
      .catch(error => console.error('Fel vid hämtning av studenter:', error));
}


document.getElementById("addCourseForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Stoppar sidan från att laddas om

  // Hämta värden från formuläret
  const title = document.getElementById("title").value;
  const number = document.getElementById("number").value;
  const description = document.getElementById("description").value;
  const days = parseInt(document.getElementById("days").value);
  const dates = document.getElementById("dates").value.split(",").map(date => date.trim());
  const classroom = document.getElementById("classroom").checked;
  const online = document.getElementById("online").checked;
  const students = document.getElementById("students").value ? document.getElementById("students").value.split(",").map(student => student.trim()) : [];

  // Skapa kursobjekt
  const newCourse = {
      title,
      number,
      description,
      days,
      dates,
      classroom,
      online,
      students,
      image: "images/default.png" // Placeholder-bild
  };

  // Skicka kursen till JSON-servern
  try {
      const response = await fetch("http://localhost:3000/courses", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newCourse)
      });

      if (response.ok) {
          alert("Kurs tillagd!");
          document.getElementById("addCourseForm").reset(); // Rensa formuläret
      } else {
          alert("Något gick fel. Försök igen.");
      }
  } catch (error) {
      console.error("Error:", error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  if (!userRole) {
      alert("Du måste vara inloggad!");
      window.location.href = "login.html";
  } else {
      console.log(`Inloggad som ${userRole} (${userEmail})`);
  }
});

function logout() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("DINA_USER_ID_HÄR"); // Ersätt med din EmailJS User ID
});

// Funktion för att skicka meddelande i chatten
function sendMessage() {
  let input = document.getElementById("chat-input");
  let chatBox = document.getElementById("chat-box");

  if (input.value.trim() !== "") {
      let message = document.createElement("div");
      message.textContent = input.value;
      message.style.padding = "10px";
      message.style.margin = "5px 0";
      message.style.background = "#ddd";
      message.style.borderRadius = "5px";
      chatBox.appendChild(message);
      chatBox.scrollTop = chatBox.scrollHeight; // Scrolla ner till senaste meddelandet
      input.value = "";
  }
}

// Funktion för att skicka e-post
function sendEmail() {
  let recipient = document.getElementById("recipient").value;
  let subject = document.getElementById("email-subject").value;
  let message = document.getElementById("email-message").value;

  if (subject.trim() === "" || message.trim() === "") {
      alert("Fyll i både ämne och meddelande.");
      return;
  }

  let emailParams = {
      to_email: recipient,
      subject: subject,
      message: message,
  };

  emailjs.send("DINA_SERVICE_ID_HÄR", "DINA_TEMPLATE_ID_HÄR", emailParams)
      .then(function (response) {
          alert("E-post skickat!");
          document.getElementById("email-subject").value = "";
          document.getElementById("email-message").value = "";
      }, function (error) {
          alert("Något gick fel: " + JSON.stringify(error));
      });
}

 // Hämta formuläret och fält
 const loginForm = document.getElementById("loginForm");
 const errorElement = document.getElementById("error");
 
 // Simulerad användardata
 const mockUser = {
   username: "admin",
   password: "password123"
 };
 
 // När formuläret skickas
 loginForm.addEventListener("submit", function (event) {
   event.preventDefault(); // Hindrar sidan från att laddas om
 
   // Hämta användarnamn och lösenord från formuläret
   const username = document.getElementById("username").value;
   const password = document.getElementById("password").value;
 
   // Kontrollera om inloggningsuppgifterna är korrekta
   if (username === mockUser.username && password === mockUser.password) {
     alert("Inloggning lyckades!");
     window.location.href = "dashboard.html"; // Skicka användaren till en ny sida
   } else {
     errorElement.textContent = "Fel användarnamn eller lösenord!";
   }
 });
 
 loginForm.addEventListener("submit", async function (event) {
     event.preventDefault();
   
     const username = document.getElementById("username").value;
     const password = document.getElementById("password").value;
   
     try {
       const response = await fetch("http://localhost:3000/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({ username, password })
       });
   
       if (response.ok) {
         const data = await response.json();
         alert(data.message);
         window.location.href = "admin.html"; // Skicka användaren vidare
       } else {
         const error = await response.json();
         errorElement.textContent = error.error;
       }
     } catch (err) {
       errorElement.textContent = "Ett tekniskt fel inträffade!";
     }
   });

   const express = require("express");
   const bodyParser = require("body-parser");
   const cors = require("cors");
   
   const app = express();
   app.use(bodyParser.json());
   app.use(cors());
   
   // Simulerad användardata
   const mockUser = {
     username: "admin",
     password: "password123"
   };
   
   // Endpoint för inloggning
   app.post("/login", (req, res) => {
     const { username, password } = req.body;
   
     if (username === mockUser.username && password === mockUser.password) {
       res.status(200).json({ message: "Inloggning lyckades!" });
     } else {
       res.status(401).json({ error: "Fel användarnamn eller lösenord!" });
     }
   });
   
   // Starta servern
   app.listen(3000, () => {
     console.log("Servern körs på http://localhost:3000");
   });