// routes/posts.routes.js
import express from "express";
import {
  createPost,
  getAllPosts,
  getPostsByCategory,
  getSinglePost,
  deletePost,
} from "../controllers/posts.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/category/:category", getPostsByCategory);
router.delete("/:slug", requireAuth, deletePost);
router.get("/:slug", getSinglePost);
router.post("/", requireAuth, createPost);

export default router;
