import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Assumes 'Bearer token'

  if (!token)
    return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "default"
    ) as any;
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
