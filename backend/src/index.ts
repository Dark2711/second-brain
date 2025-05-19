import express from "express";
import connectDB from "./config/db";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route";
dotenv.config();

const app = express();
const Port = process.env.PORT;
connectDB();


app.use('/api/v1/user', userRouter)


app.listen(Port, () => {
    console.log(`Server is running on Port: ${Port}`);
    
})