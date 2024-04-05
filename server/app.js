import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { doctorRouter } from './routes/doctor.js';
import { bookingRouter } from './routes/bookings.js';
import { forumRouter } from './routes/forum.js';
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use("/create-checkout-session", bookingRouter);
app.use("/auth", userRouter);
app.use("/doc", doctorRouter);
app.use("/forum", forumRouter);

mongoose.connect("mongodb+srv://user001:test12345@cluster0.orisnk7.mongodb.net/medicare?",{ useNewUrlParser: true, useUnifiedTopology: true });

const YOUR_DOMAIN = 'http://localhost:3001';

app.listen(3001, () => console.log("Server started at 3001"));
