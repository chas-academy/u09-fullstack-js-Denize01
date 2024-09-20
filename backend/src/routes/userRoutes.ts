import { Router } from "express";
import {
  createUserController,
  getUsersController,
} from "../controllers/userController";

const router = Router();

router.post("/user", createUserController);
router.get("/users", getUsersController);

export default router;
