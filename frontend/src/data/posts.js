
const API_URL = import.meta.env.VITE_API_URL;

export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return await response.json();
};

export const createPost = async (postData, token) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  return await response.json();
};