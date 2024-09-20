import User from "../models/userModel";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, roles } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    console.log("recieved data", req.body);

    const newUser = await User.create({ name, email, password, roles });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ messsage: "Error. User could not be created", error });
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
