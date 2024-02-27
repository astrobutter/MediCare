import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { doctorRouter } from './routes/doctor.js';
// import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/doc", doctorRouter);
// app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://user001:test12345@cluster0.orisnk7.mongodb.net/medicare?",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// mongodb+srv://user001:<password>@cluster0.nlqhxmi.mongodb.net/?retryWrites=true&w=majority
app.listen(3001, () => console.log("Server started at 3001"));
