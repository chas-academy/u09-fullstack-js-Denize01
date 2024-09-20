import User from "../models/userModel";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    console.log("recieved data", req.body);

    const newUser = await User.create({ name, email, password });
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

// import { Request, Response } from "express";
// import User from "../models/userModel";

// // Skapa en ny användare
// export const createUserController = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;

//   try {
//     // Kontrollera om användaren redan finns
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Användare med denna e-postadress finns redan" });
//     }

//     // Skapa en ny användare utan lösenordshashning
//     const newUser = await User.create({
//       name,
//       email,
//       password, // Lagrar lösenordet som det är (endast för teständamål)
//     });

//     res.status(201).json({
//       _id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user", error });
//   }
// };

// // Hämta alla användare
// export const getUsersController = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find().select("-password"); // Exkludera lösenord från svaret
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users", error });
//   }
// };
