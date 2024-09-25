import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username." });
    }

    if (user.status === "pending") {
      return res
        .status(400)
        .json({ error: "Registration with this username is still pending." });
    } else if (user.status === "rejected") {
      return res.status(400).json({
        error: "Registration with this username has been rejected.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Create a JWT payload containing the user's data (role, _id, etc.)
      const payload = {
        id: user._id, // Only include essential fields
        role: user.role,
      };

      // Sign the token with the secret key
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || "default", {
        expiresIn: "1h", // Token expiration time
      });
      return res.json({
        token: token,
        user: user,
        message: "Successfully logged in.",
      });
    } else {
      return res.status(400).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error logging in." });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        message: "Please provide userId and userRole to access this endpoint!",
      });
    }
    const requestingUserId = req.user.id; // Assuming `req.user` contains authenticated user details

    const user = await User.findById(requestingUserId);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const { userId, oldPassword, newPassword } = req.body;
    if (userId !== requestingUserId) {
      return res.status(403).json({
        message: "Not authorized to change password for this user!",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Provided old password is incorrect." });
    }

    // Hash password as a basic safety measure.
    const hashedPassword = await bcrypt.hash(
      newPassword,
      /* number of salt rounds */ 10
    );

    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password successfully updated." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error updating password." });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  const { userId, updates } = req.body;

  if (!req.user) {
    return res.status(403).json({
      message: "Please provide userId and userRole to access this endpoint!",
    });
  }

  const requestingUserId = req.user.id; // Assuming `req.user` contains authenticated user details
  const requestingUserRole = req.user.role; // Assuming `req.user.role` contains the role

  try {
    // Check if the requesting user is either the user themselves or an admin
    if (requestingUserId !== userId && requestingUserRole !== "admin") {
      return res.status(403).json({
        message:
          "Forbidden: You can only update your own data or must be an admin.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating user data", error: err });
  }
};
