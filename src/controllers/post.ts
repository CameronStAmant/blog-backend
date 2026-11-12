import { Request, Response } from "express";
import db, { post } from "../db/schema";
import { matchedData, validationResult } from "express-validator";
import { eq } from "drizzle-orm";

const getPosts = async (req: Request, res: Response) => {
  const data = await db.select().from(post);
  res.json(data);
};

const createPosts = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { title, body, authorId } = matchedData(req);
  const newPost = (
    await db.insert(post).values({ title, body, authorId }).returning()
  )[0];

  res.json(newPost);
};

const deletePosts = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { ids } = matchedData(req);
  const deletedPosts = [];

  for (const id of ids) {
    deletedPosts.push(
      (await db.delete(post).where(eq(post.id, id)).returning())[0],
    );
  }
  res.json(deletedPosts);
};

export default {
  getPosts,
  createPosts,
  deletePosts,
};
