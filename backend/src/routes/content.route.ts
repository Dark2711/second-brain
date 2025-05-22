import express, { RequestHandler } from "express";

import authMiddleware from "../middleware/auth";
import {
  addContent,
  deleteContent,
  getContent,
} from "../controllers/content.controller";
const contentRouter = express.Router();

contentRouter.post("/posts", authMiddleware as RequestHandler, addContent);
contentRouter.get("/posts", authMiddleware as RequestHandler, getContent);
contentRouter.delete(
  "/posts/:id",
  authMiddleware as RequestHandler,
  deleteContent
);
export default contentRouter;
