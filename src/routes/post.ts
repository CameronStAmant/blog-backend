import { Router } from "express";
import postController from "../controllers/post";
import { body } from "express-validator";

const router = Router();

router.get("/", postController.getPosts);

const postValidation = [
  body("title")
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title must be under 100 characters."),
  body("body")
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Body is required.")
    .isLength({ max: 10000 })
    .withMessage("Body must be under 10,000 characters."),
  body("authorId")
    .trim()
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("ID must be an integer."),
];
router.post("/", postValidation, postController.createPosts);

export default router;
