import express, { RequestHandler } from "express";
import { signin, signup, verify } from "../controllers/user.controller";
import authMiddleware from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/verify", authMiddleware as RequestHandler, verify);
export default userRouter;
