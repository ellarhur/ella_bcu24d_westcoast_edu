document.addEventListener("DOMContentLoaded", async () => {
    checkAuth();
    await loadTeachers();
    await loadCourses();
    await loadStudents();

    document.querySelector(".addCourseForm").addEventListener("submit", addCourse);
    document.querySelector(".addTeacherForm").addEventListener("submit", addTeacher);
});

const checkAuth = () => {
    const teacher = JSON.parse(localStorage.getItem("loggedInTeacher"));
    if (!teacher) {
        alert("Du måste vara inloggad som lärare!");
        window.location.href = "log-sign.html";
    }
};

const loadTeachers = async () => {
    try {
        const response = await fetch("http://localhost:3000/teachers");
        const teachers = await response.json();
    
        const select = document.querySelector("#teacher");
        const teacherList = document.querySelector("#teacherList");
        select.innerHTML = "";
        teacherList.innerHTML = "";
    
        teachers.forEach(teacher => {
            // Lägg till i dropdown
            const option = document.createElement("option");
            option.value = teacher.id;
            option.textContent = teacher.id;
            select.appendChild(option);
            
            // Lägg till i listan
            const div = document.createElement("div");
            div.textContent = `${teacher.id} - ${teacher.email} (${teacher.subject})`;
            teacherList.appendChild(div);
        });
    } catch (error) {
        console.error("Fel vid hämtning av lärare:", error);
    }
};

const loadStudents = async () => {
    try {
        const response = await fetch("http://localhost:3000/students");
        const students = await response.json();
        
        const studentList = document.querySelector("#studentList");
        studentList.innerHTML = "";
    
        students.forEach(student => {
            const div = document.createElement("div");
            div.textContent = `${student.name} - ${student.email}`;
            div.classList.add("clickable");
            div.addEventListener("click", () => {
                window.location.href = `student-profile.html?id=${student.id}`;
            });
            studentList.appendChild(div);
        });
    } catch (error) {
        console.error("Fel vid hämtning av studenter:", error);
    }
};

const loadCourses = async () => {
    try {
        const response = await fetch("http://localhost:3000/courses");
        const courses = await response.json();
    
        const courseList = document.querySelector("#courseList");
        courseList.innerHTML = "";
    
        courses.forEach(course => {
            const div = document.createElement("div");
            div.textContent = `${course.title} (${course.number}) - ${course.teacher}`;
            courseList.appendChild(div);
        });
    } catch (error) {
        console.error("Fel vid hämtning av kurser:", error);
    }
};

const addCourse = async (e) => {
    e.preventDefault();
    
    const newCourse = {
        title: document.querySelector("#title").value,
        number: document.querySelector("#number").value,
        days: document.querySelector("#days").value,
        dates: document.querySelector("#dates").value.split(", "),
        online: document.querySelector("#online").checked,
        teacher: document.querySelector("#teacher").value
    };

    try {
        await fetch("http://localhost:3000/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCourse)
        });
        alert("Kurs tillagd!");
        loadCourses();
    } catch (error) {
        console.error("Fel vid tillägg av kurs:", error);
    }
};

const addTeacher = async (e) => {
    e.preventDefault();
    
    const newTeacher = {
        id: document.querySelector("#teacherName").value,
        email: document.querySelector("#teacherEmail").value,
        subject: document.querySelector("#teacherSpecialization").value
    };

    try {
        await fetch("http://localhost:3000/teachers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTeacher)
        });
        alert("Lärare tillagd!");
        loadTeachers();
    } catch (error) {
        console.error("Fel vid tillägg av lärare:", error);
    }
};

const logout = () => {
    localStorage.removeItem("loggedInTeacher");
    window.location.href = "log-sign.html";
};

document.querySelector("#logoutButton").addEventListener("click", logout);
