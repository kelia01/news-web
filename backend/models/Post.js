// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: String,
    content: {
  type: String,
  required: true,
},
    category: {
      type: String,
      required: true,
      enum: [
        "Ubuzima",
        "Imikino",
        "Politike",
        "Ubucuruzi",
        "Ubuhanzi",
        "Science",
        "Isi yose",
      ],
    },
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
