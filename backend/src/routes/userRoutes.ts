import { Router } from "express";
import {
  createUserController,
  getUsersController,
  loginUserController,
  updateUserRoleController,
  deleteUserController,
} from "../controllers/userController";

const router = Router();

router.post("/register", createUserController);
router.get("/users", getUsersController);
router.post("/login", loginUserController);
router.put("/users/:id", updateUserRoleController);
router.delete("/users/:id", deleteUserController);

export default router;
