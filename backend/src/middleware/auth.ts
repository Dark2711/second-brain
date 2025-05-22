import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(403).json({ message: "Token is required" });
      return;
    }

    const token = authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      userId: string;
    };

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
