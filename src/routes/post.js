import express from "express";
import * as postController from "../controllers/postController";
import verifyToken from "../middleware/verifyToken";
const router = express.Router();

router.get("/all", postController.getPost);
router.get("/limit", postController.getPostLimit);
router.get("/new-post", postController.getNewPost);

router.use(verifyToken);
router.post("/create-new", postController.createNewPost);
router.get("/limit-admin", postController.getPostLimitAdmin);
router.put("/update-post", postController.updatPost);
router.delete("/delete-post", postController.deletePost);

export default router;
