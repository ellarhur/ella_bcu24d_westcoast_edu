import { ITeacher } from '../models/ITeacher.js';

export const teachers: ITeacher[] = [
  {
    id: 'Anna Forsberg',
    subject: 'Webbutveckling & UX/UI-design',
    classroom: true,
    online: true,
    image: '/images/teacher1.jpg',
    description:
      'En engagerad lärare med fokus på HTML, CSS och JavaScript. Hon älskar att lära ut modern design och tillgänglighet på webben.',
  },
  {
    id: 'Erik Lindström',
    subject: 'Systemutveckling & Databaser',
    classroom: true,
    online: false,
    image: '/images/teacher2.jpg',
    description:
      'Har en bakgrund som backend-utvecklare och lär studenter att bygga robusta system med SQL, NoSQL och API:er.',
  },
  {
    id: 'Sofia Berglund',
    subject: 'Cybersäkerhet & Nätverkssäkerhet',
    classroom: false,
    online: true,
    image: '/images/teacher4.png',
    description:
      'Expert på penetrationstester och säker programmering. Brinner för att utbilda studenter i att skydda system från cyberattacker.',
  },
  {
    id: 'Johan Ekström',
    subject: 'Programmering i Python & Java',
    classroom: true,
    online: true,
    image: '/images/teacher3.jpg',
    description:
      'Har arbetat som mjukvaruutvecklare i 15 år. Gör kodning roligt genom att bygga små spel och AI-projekt i undervisningen.',
  },
  {
    id: 'Lisa Nygren',
    subject: 'AI & Maskininlärning',
    classroom: true,
    online: false,
    image: '/images/teacher5.png',
    description:
      'Passionerad om dataanalys och artificiell intelligens. Fokuserar på praktisk AI-användning med TensorFlow och Python.',
  },
  {
    id: 'Daniel Sjöberg',
    subject: 'IT-projektledning & Agila metoder',
    classroom: false,
    online: true,
    image: '/images/teacher6.png',
    description:
      'Hjälper studenter att förstå Scrum, Kanban och hur man effektivt leder IT-projekt i företag.',
  },
  {
    id: 'Elon Karlsson',
    subject: 'Mobilapp-utveckling (Android & iOS)',
    classroom: true,
    online: true,
    image: '/images/teacher7.png',
    description:
      'Specialist på React Native och Swift. Brinner för att utveckla smarta appar med snygg design.',
  },
  {
    id: 'Magnus Hellström',
    subject: 'Cloud Computing & DevOps',
    classroom: true,
    online: false,
    image: '/images/teacher8.png',
    description:
      'Lär ut AWS, Docker och Kubernetes. Hjälper studenter att förstå hur man bygger skalbara system i molnet.',
  },
  {
    id: 'Cameron Sundberg',
    subject: 'Spelutveckling & 3D-grafik',
    classroom: false,
    online: true,
    image: '/images/teacher9.png',
    description:
      'Arbetade tidigare på en spelstudio och lär ut Unity och Unreal Engine. Motiverar studenter att skapa sina egna spel.',
  },
  {
    id: 'Fredrik Norén',
    subject: 'Embedded Systems & IoT',
    classroom: true,
    online: true,
    image: '/images/teacher10.png',
    description:
      'Specialist på inbyggda system och hårdvarunära programmering. Hjälper studenter att koppla upp och styra IoT-enheter.',
  },
];
