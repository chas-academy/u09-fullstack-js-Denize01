// import User from "../models/userModel";
// import { Request, Response } from "express";

// export const createUserController = async (req: Request, res: Response) => {
//   const { name, email, password, roles } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists" });
//     }

//     console.log("recieved data", req.body);

//     const newUser = await User.create({ name, email, password, roles });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ messsage: "Error. User could not be created", error });
//   }
// };

// export const getUsersController = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users", error });
//   }
// };

// userController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel";

// Skapa en ny användare
export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, roles } = req.body; // Hämta data från frontend

  try {
    // Kolla om användaren redan existerar
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hasha lösenordet innan du sparar
    const hashedPassword = await bcrypt.hash(password, 12);

    // Skapa och spara den nya användaren i databasen
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      roles: roles || "user", // Om ingen roll anges, sätt till "user"
    });

    await newUser.save(); // Spara användaren i MongoDB

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Hämta alla användare
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find(); // Hämta alla användare från databasen
    res.status(200).json(users); // Returnera användarna i svaret
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
