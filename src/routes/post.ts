import { Router } from "express";
import postController from "../controllers/post";

const router = Router();

router.get("/", postController.getPosts);
router.post("/", postController.createPosts);

export default router;
