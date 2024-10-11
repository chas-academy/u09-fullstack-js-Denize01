import { Router } from "express";
import {
  createUserController,
  getUsersController,
  loginUserController,
} from "../controllers/userController";

const router = Router();

router.post("/register", createUserController);
router.get("/users", getUsersController);
router.post("/login", loginUserController);

export default router;
