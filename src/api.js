export const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const createPost = async (post) => {
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };