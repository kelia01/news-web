// controllers/posts.controller.js
import Post from "../models/Post.js";
import slugify from "slugify";

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
    const { title, excerpt, category, image } = req.body;
    let baseSlug = slugify(title, {lower: true, strict: true})
    let slug = baseSlug
    let count = 1

    while(await Post.findOne({ slug })) {
      slug = `${baseSlug}-${count}`
      count++
    }

    if (!title || !excerpt || !category || !image) {
      return res.status(400).json({
        message: "Title and category are required",
      });
    }
    const post = await Post.create({
      title,
      slug,
      excerpt,
      category,
      image,
    });

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

