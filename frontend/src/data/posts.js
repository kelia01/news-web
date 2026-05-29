export const fetchPosts = async () => {
  const response = await fetch("http://localhost:5000/posts");
  return await response.json();
};

export const createPost = async (postData, token) => {
  const response = await fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  return await response.json();
};