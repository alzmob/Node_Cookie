import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { credentialsRouter } from "./src/routes/userCredentials.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
  origin:["http://localhost:5173"],
  method: ["GET", "POST"],
  credentials:true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/auth", credentialsRouter );

mongoose.connect(
    "mongodb+srv://Gilley55:Htd7tFxoe7850@cluster0.cisre.mongodb.net/Digital1Network?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.listen(3000, () => console.log("SERVER STARTED at : http://localhost:5173/"));