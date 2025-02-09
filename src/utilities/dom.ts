// import { ICourse } from '../models/ICourse.js';
// import { ICourseDetails } from '../models/ICourseDetails.js';

// export const createOverlay = (backdrop_path: string): HTMLDivElement => {
//   const overlayDiv = document.createElement('div');

//   overlayDiv.style.backgroundImage = backdrop_path
//     ? `url(https://image.tmdb.org/t/p/original/${backdrop_path})`
//     : '';
//   overlayDiv.style.backgroundSize = 'cover';
//   overlayDiv.style.backgroundPosition = 'center';
//   overlayDiv.style.backgroundRepeat = 'no-repeat';
//   overlayDiv.style.height = '100vh';
//   overlayDiv.style.width = '100vw';
//   overlayDiv.style.position = 'absolute';
//   overlayDiv.style.top = '0';
//   overlayDiv.style.left = '0';
//   overlayDiv.style.zIndex = '-1';
//   overlayDiv.style.opacity = '0.3';

//   return overlayDiv;
// };

// export const createDisplayCard = (
//   Course: ICourse,
//   href: string
// ): HTMLDivElement => {
//   const div = document.createElement('div');
//   const imageAnchor = document.createElement('a');
//   const image = document.createElement('img');
//   const cardBody = document.createElement('div');
//   const heading = document.createElement('h5');
//   const p = document.createElement('p');
//   const small = document.createElement('small');

//   div.classList.add('card');
//   imageAnchor.href = `./${href}?id=${Course.id}`;
//   image.alt = `${Course.title}`;
//   image.src = Course.image
//     ? `https://image.tmdb.org/t/p/w500${Course.poster}`
//     : `../../dist/assets/images/No-Image.jpg`;

//   imageAnchor.appendChild(image);
//   div.appendChild(imageAnchor);

//   cardBody.classList.add('card-body');
//   heading.classList.add('card-title');
//   heading.textContent = Course.title;

//   p.classList.add('card-text');
//   p.classList.add('text-muted');
//   small.textContent = `Premiär datum: ${Course.dates}`;
//   p.appendChild(small);

//   cardBody.appendChild(heading);
//   cardBody.appendChild(p);

//   div.appendChild(cardBody);
//   return div;
// };

// export const createDetailsDisplay = (Course: ICourseDetails): HTMLDivElement => {
//   const div = document.createElement('div');
//   div.innerHTML = `
//     <div class="details-top">
//       <div>
//         ${
//           Course.image
//             ? `<img src="https://image.tmdb.org/t/p/w500${Course.image}" alt="${Course.title}"/>`
//             : `<img src="../dist/assets/images/No-Image.jpg" alt="${Course.title}"`
//         }
//       </div>
//       <div class="info">
//         <h2>${Course.title}</h2>
//      </div>
//   `;

//   return div;
// };

// export const displayNotFoundMessage = (message: string) => {
//   const messageContainer = document.querySelector<HTMLDivElement>('#message');
//   const header = document.querySelector('h2') as HTMLHeadElement;
//   const filterInputValue =
//     document.querySelector<HTMLInputElement>('#searchInput')!.value;

//   messageContainer!.innerHTML = `<p>${message} ${filterInputValue}</p>`;
//   messageContainer!.style.display = 'block';
//   messageContainer!.style.paddingTop = '1rem';
//   messageContainer!.style.paddingBottom = '1rem';
//   header.style.display = 'none';
// };

// export const hideNotFoundMessage = () => {
//   const messageContainer = document.querySelector<HTMLDivElement>('#message');
//   const header = document.querySelector('h2') as HTMLHeadElement;

//   messageContainer!.style.display = 'none';
//   header.style.display = 'block';
// };
