import express from "express";
import * as controller from "../controllers/acreageController";

//CRUD

const router = express.Router();

router.get("/all", controller.getAcreage);

export default router;
