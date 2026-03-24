import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";
import UserRoutes from "./routes/user.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(postRoutes);
app.use(UserRoutes);
app.use(express.static("uploads"));


const start = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/Linkedln-App");
  console.log("databse is created");
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`server is listing on ${PORT}`);
  });
};

start();
