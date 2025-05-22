import zod from "zod";
import { Request, Response } from "express";
import { Content } from "../models/content.model";
const contentBody = zod.object({
  title: zod.string(),
  link: zod.string(),
  type: zod.string().optional(),
  tags: zod.array(zod.string()).optional(),
});

interface addContentRequest extends Request {
  userId?: string;
}

export const addContent = async (req: addContentRequest, res: Response) => {
  const body = req.body;
  const { success } = contentBody.safeParse(body);
  if (!success) {
    res.status(411).json({ message: "Invalid Inputs" });
    return;
  }
  try {
    const content = await Content.create({
      title: body.title,
      link: body.link,
      type: body.type,
      userId: req.userId,
      tags: [],
    });

    res.status(200).json({ message: "Content Added" });
    return;
  } catch (error) {
    console.log("Content Adding error: ", error);
    res.status(500).json({ message: "Server Error" });
    return;
  }
};

interface getContentRequest extends Request {
  userId?: string;
}
export const getContent = async (req: getContentRequest, res: Response) => {
  const userId = req.userId;
  try {
    const content = await Content.find({ userId: userId }).populate(
      "userId",
      "username"
    );

    res.json({ content });
    return;
  } catch (error) {
    console.log("Error fetching contents: ", error);
    res.status(500).json({ message: "Server Error" });
    return;
  }
};

interface deleteContentRequest extends Request {
  userId?: string;
}

export const deleteContent = async (
  req: deleteContentRequest,
  res: Response
) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Content.deleteMany({
      postId: postId,
      userId: req.userId,
    });

    if (!deletedPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json({ message: "Post deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
    return;
  }
};
