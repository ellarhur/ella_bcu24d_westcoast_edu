const students = [
    {
      id: "student1",
      name: "George",
      email: "george@email.com",
      password: "george1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" }
      ]
    },
    {
      id: "student2",
      name: "Hannah",
      email: "hannah@email.com",
      password: "hannah1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" }
      ]
    },
    {
      id: "student3",
      name: "Isabella",
      email: "isabella@email.com",
      password: "isabella",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" }
      ]
    },
    {
      id: "student4",
      name: "Jenny",
      email: "jenny@email.com",
      password: "jenny1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" }
      ]
    },
    {
      id: "student5",
      name: "Johnny",
      email: "johnny@email.com",
      password: "johnny1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" }
      ]
    },
    {
      id: "student6",
      name: "Leah",
      email: "leah@email.com",
      password: "leah1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" },
        { courseId: "COM101", courseName: "Gruppdynamik, GDPR och kontorsmiljön", teacher: "Erik Lindström" }
      ]
    },
    {
      id: "student7",
      name: "Dennis",
      email: "dennis@email.com",
      password: "dennis1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" },
        { courseId: "COM101", courseName: "Gruppdynamik, GDPR och kontorsmiljön", teacher: "Erik Lindström" }
      ]
    },
    {
      id: "student8",
      name: "Omar",
      email: "omar@email.com",
      password: "omar1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" },
        { courseId: "COM101", courseName: "Gruppdynamik, GDPR och kontorsmiljön", teacher: "Erik Lindström" }
      ]
    },
    {
      id: "student9",
      name: "Fanny",
      email: "fanny@email.com",
      password: "fanny1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" },
        { courseId: "COM101", courseName: "Gruppdynamik, GDPR och kontorsmiljön", teacher: "Erik Lindström" }
      ]
    },
    {
      id: "student10",
      name: "Martin",
      email: "martin@email.com",
      password: "martin1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" },
        { courseId: "COM101", courseName: "Gruppdynamik, GDPR och kontorsmiljön", teacher: "Erik Lindström" },
        { courseId: "AI101", courseName: "Bli en proffsig AI prompt engineer", teacher: "Fredrik Norén" },
        { courseId: "AI201", courseName: "Programmera egna AI-verktyg", teacher: "Fredrik Norén" },
        { courseId: "NET101", courseName: "Grundläggande IT-säkerhet för nätverk", teacher: "Daniel Sjöberg" },
        { courseId: "NET201", courseName: "Etisk hackning och brandväggar", teacher: "Daniel Sjöberg" }
      ]
    },
    {
      id: "student11",
      name: "Fia",
      email: "fia@email.com",
      password: "fia1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" },
        { courseId: "COM101", courseName: "Gruppdynamik, GDPR och kontorsmiljön", teacher: "Erik Lindström" },
        { courseId: "AI101", courseName: "Bli en proffsig AI prompt engineer", teacher: "Fredrik Norén" },
        { courseId: "AI201", courseName: "Programmera egna AI-verktyg", teacher: "Fredrik Norén" }
      ]
    },
    {
      id: "student12",
      name: "Lenny",
      email: "lenny@email.com",
      password: "lenny1",
      bookings: [
        { courseId: "WEB101", courseName: "Frontend Development", teacher: "Anna Forsberg" },
        { courseId: "WEB201", courseName: "Backend Development", teacher: "Fredrik Norén" },
        { courseId: "WEB301", courseName: "Fullstack Development", teacher: "Anna Forsberg" },
        { courseId: "LAN301", courseName: "Djupdyk i C#", teacher: "Cameron Sundberg" },
        { courseId: "COM101", courseName: "Gruppdynamik, GDPR och kontorsmiljön", teacher: "Erik Lindström" }
      ]
    }
  ];
  