import express from "express"

const userRouter = express.Router();

userRouter.post('/signup')
userRouter.post('/signin')

export default userRouter;