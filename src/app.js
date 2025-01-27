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