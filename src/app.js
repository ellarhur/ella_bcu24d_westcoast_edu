import { fetchPosts, createPost } from './api.js';
import { createElement } from './utils/helpers.js';

const init = async () => {
  const postsContainer = document.getElementById('posts');

  // Fetch and render posts
  const posts = await fetchPosts();
  posts.forEach(post => {
    const postElement = createElement('div', 'post', post.title);
    postsContainer.appendChild(postElement);
  });

  // Add event listener for creating posts
  document.getElementById('createPost').addEventListener('click', async () => {
    const newPost = { title: 'New Post', content: 'Content goes here' };
    await createPost(newPost);
    alert('Post created! Refresh to see the changes.');
  });
};

init()


// LANDING PAGE SLIDESHOW HÄMTAD FRÅN W3 SCHOOLS
import {} from '';


let slideIndex = 1;
showSlides(slideIndex);



// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}