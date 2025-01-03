import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel";
import activity from "../models/activity";
import jwt from "jsonwebtoken";

// Skapa en ny användare
export const createUserController = async (req: Request, res: Response) => {
  const { username, email, password, roles } = req.body; // Hämta data från frontend

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
      username,
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

export const logoutUserController = async (req: Request, res: Response) => {
  res.clearCookie("token"),
    {
      httpOnly: true,
    };

  res.status(200).json({
    message: "Successfully logged out!",
  });
};

// Inloggningsfunktion
export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Ta emot inloggningsuppgifter

  try {
    // Hitta användaren baserat på e-post
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Kontrollera om lösenordet är korrekt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log(user);

    let token = jwt.sign(
      { user: user },
      "8df254a9b6db0571414ab57b232f6f4b31987514120cf052822a83aff18c9414bede0da145e643c5fa13a1bd8bce0903d424a20e7e17ab617995e57a216c308f",
      {
        expiresIn: "24h",
      }
    );

    const cookieOptions = {
      httpOnly: true,
    };
    res.cookie("token", token, cookieOptions);

    req.session.userId = user._id;

    // Om inloggningen lyckas, returnera användarinformation eller token
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Radera en användare
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params; // Få användarens ID från URL:en

  try {
    // Hitta och radera användaren av Admin
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE-rutt för att radera en aktivitet
export const deleteActivity = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Försök hitta och radera aktiviteten från databasen
    const deletedActivity = await activity.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete activity", error });
  }
};

// Användare raderar ditt eget konto
export const deleteOwnAccountController = async (
  req: Request,
  res: Response
) => {
  const userId = req.session.userId; // Hämtar användarens ID från sessionen

  try {
    // Radera användaren baserat på sessionens användar-ID
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Rensa sessionen efter radering
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Error destroying session" });
      }
      res
        .status(200)
        .json({ message: "Your account has been deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting own account:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Uppdatera endast användarnamn
export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params; // Få användarens ID från URL:en
  const { username } = req.body; // Hämta nytt användarnamn från request body

  try {
    // Kontrollera att användarnamn är tillhandahållet
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Hitta och uppdatera användaren i databasen
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { username }, // Endast uppdatera användarnamnet
      { new: true } // Returnera den uppdaterade användaren
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
