import { Request, Response } from "express";
import db, { post } from "../db/schema";

const getPosts = async (req: Request, res: Response) => {
  const data = await db.select().from(post);
  res.json(data);
};

const createPosts = async (req: Request, res: Response) => {
  const newPost = (await db.insert(post).values(req.body).returning())[0];

  res.json(newPost);
};

export default {
  getPosts,
  createPosts,
};
