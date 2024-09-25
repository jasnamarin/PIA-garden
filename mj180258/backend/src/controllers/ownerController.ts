import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/User";

// Uses query parameters to register owners
export const registerOwner = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      address,
      phone,
      gender,
      profilePicture,
      creditCard,
    } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log("Username or email already exists:", username, email);
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    let userData = {
      firstName,
      lastName,
      email,
      username,
      password,
      phone,
      address,
      gender,
      creditCard,
      profilePicture,
      status: "pending", // Until approved or rejected by admin.
      role: "owner",
    };

    // Hash password as a basic safety measure.
    const hashedPassword = await bcrypt.hash(
      password,
      /* number of salt rounds */ 10
    );
    userData.password = hashedPassword;

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully.", user: savedUser });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error registering user.",
    });
  }
};
