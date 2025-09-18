import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { doctorRouter } from './routes/doctor.js';
import { bookingRouter } from './routes/bookings.js';
import { forumRouter } from './routes/forum.js';
const allowed = [process.env.FRONTEND_URL];
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.get("/health", (_, res) => res.send("ok"));
app.use("/create-checkout-session", bookingRouter);
app.use("/auth", userRouter);
app.use("/doc", doctorRouter);
app.use("/forum", forumRouter);

mongoose.connect("mongodb+srv://user001:test12345@cluster0.orisnk7.mongodb.net/medicare?",{ useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT || 3001, () => console.log(`Server started at ${YOUR_DOMAIN}`));
