import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import contentRouter from "./routes/content.route";
dotenv.config();

const app = express();
const Port = process.env.PORT;

app.use(express.json());

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
// app.use("/api/v1/brain");

app.listen(Port, () => {
  console.log(`Server is running on Port: ${Port}`);
});
