// controllers/posts.controller.js
import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ publishedAt: -1 });
  res.json(posts);
};

export const getPostsByCategory = async (req, res) => {
  const { category } = req.params;

  const posts = await Post.find({ category });
  res.json(posts);
};

export const getSinglePost = async (req, res) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
};

export const createPost = async (req, res) => {
  try {
    const { title, slug, category } = req.body;

    if (!title || !slug || !category) {
      return res.status(400).json({
        message: "Title, slug, and category are required",
      });
    }
    const post = await Post.create(req.body);

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
    return res.status(409).json({
      message: "A post with this slug already exists",
    });
  }

    res.status(400).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};

