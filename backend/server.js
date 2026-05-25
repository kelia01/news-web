// server.js
import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postsRoutes from "./routes/posts.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
}).then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("❌ Connection error:", err.message));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
