// routes/posts.routes.js
import express from "express";
import {
  createPost,
  getAllPosts,
  getPostsByCategory,
  getSinglePost,
} from "../controllers/posts.controller.js";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/category/:category", getPostsByCategory);
router.get("/:slug", getSinglePost);
router.post("/", createPost);
router.post("/auth/register", register);
router.post("/auth/login", login);

export default router;
