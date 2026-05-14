const API_BASE_URL = "http://localhost:3000";

export const getAuthToken = () => localStorage.getItem("blog_token");

// Posts API
export const getPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error("Failed to fetch post");
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const createPost = async (post, userId) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
        author: post.author,
        userId: userId,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error("Failed to create post");
    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (id, post, userId) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
        author: post.author,
        userId: userId,
      }),
    });

    if (!response.ok) throw new Error("Failed to update post");
    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  // no userId needed
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // no body needed
  });
  if (!response.ok) throw new Error("Failed to delete post");
  return { message: "Post deleted" };
};
