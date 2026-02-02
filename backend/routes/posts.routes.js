// routes/posts.routes.js
import express from "express";
import {
  getAllPosts,
  getPostsByCategory,
  getSinglePost,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/category/:category", getPostsByCategory);
router.get("/:slug", getSinglePost);

export default router;
