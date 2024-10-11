import { Router } from "express";
import {
  createUserController,
  getUsersController,
} from "../controllers/userController";

const router = Router();

router.post("/register", createUserController);
router.get("/users", getUsersController);

export default router;
