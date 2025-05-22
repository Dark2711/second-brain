import { Request, Response } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

const signupBody = zod.object({
  username: zod
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(10, { message: "Username must be at most 10 characters" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

const signinBody = zod.object({
  username: zod.string().min(1, "Username is required"),
  password: zod.string().min(1, "Password is required"),
});

export const signup = async (req: Request, res: Response) => {
  const body = req.body;

  const { success } = signupBody.safeParse(body);

  if (!success) {
    res.status(411).json({ message: "Invalid Inputs" });
    return;
  }

  try {
    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
      res.status(403).json({
        message: "User Already with this email",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      username: body.username,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "Signed up",
    });
    return;
  } catch (error) {
    console.log("Signup error", error);
    res.status(500).json({
      Error: "Internal Server Error",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const body = req.body;

  const { success } = signinBody.safeParse(body);
  if (!success) {
    res.status(411).json({
      message: "Invalid Inputs",
    });
    return;
  }

  try {
    const user = await User.findOne({ username: body.username });
    if (!user) {
      res.status(401).json({
        message: "User does not exist",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "something"
    );

    res.status(200).json({ message: "Sign-in successful", token: token });
    return;
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

interface VerifyRequest extends Request {
  userId?: string;
}
export const verify = async (req: VerifyRequest, res: Response) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.status(200).json({ message: "Token is valid", userId: req.userId });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
