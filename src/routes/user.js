import express from "express";
import verifyToken from "../middleware/verifyToken";
import * as userController from "../controllers/userController";
const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrentUser);
router.put("/", userController.updateUser);
export default router;
