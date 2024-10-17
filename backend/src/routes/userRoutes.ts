import { Router } from "express";
import {
  createUserController,
  getUsersController,
  loginUserController,
  updateUserRoleController,
  deleteUserController,
} from "../controllers/userController";
import userModel from "../models/userModel";
import { Request, Response } from "express";

declare module "express-session" {
  export interface SessionData {
    userId: any;
  }
}

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Spara userId i sessionen
    req.session.userId = user._id;
    console.log("created usedID", req.session.userId);
    res
      .status(200)
      .json({ message: "Login successful", username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

router.post("/register", createUserController);
router.get("/users", getUsersController);
// router.post("/login", loginUserController);
router.put("/users/:id", updateUserRoleController);
router.delete("/users/:id", deleteUserController);

export default router;
