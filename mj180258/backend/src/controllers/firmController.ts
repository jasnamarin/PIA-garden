import { Request, Response } from "express";
import { Firm } from "../models/Firm";

export const getFirms = async (req: Request, res: Response) => {
  try {
    // Define the type of the query object (any type is safer here)
    const { searchName, searchAddress, sortBy, sortOrder } =
      req.query as Record<string, any>;

    // Initialize query object
    const query: Record<string, any> = {};

    // Add search conditions to the query object if they exist
    if (searchName) query.name = new RegExp(searchName, "i"); // Case-insensitive search
    if (searchAddress) query.address = new RegExp(searchAddress, "i");

    // Initialize sort options (with any type to support dynamic sorting)
    const sortOptions: Record<string, any> = {};
    if (sortBy) sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Fetch firms from the database with sorting and population of decorators
    const firms = await Firm.find(query)
      .sort(sortOptions)
      .populate("decorators", "firstName lastName");

    // Return the fetched firms
    res.status(200).json(firms);
  } catch (error) {
    console.error("Error fetching firms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
