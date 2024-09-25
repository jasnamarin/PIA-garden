import { Request, Response } from "express";
import { User } from "../models/User";
import { Firm } from "../models/Firm";

export const getAllOwners = async (req: Request, res: Response) => {
  try {
    const owners = await User.find({ role: "owner" });
    return res.status(200).json(owners);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching owners", error: err });
  }
};

export const getAllDecorators = async (req: Request, res: Response) => {
  try {
    const decorators = await User.find({ role: "decorator" });
    return res.status(200).json(decorators);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching decorators", error: err });
  }
};

export const getAllFirms = async (req: Request, res: Response) => {
  try {
    const firms = await Firm.find();
    return res.status(200).json(firms);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching firms", error: err });
  }
};

export const getOwnerRequests = async (req: Request, res: Response) => {
  try {
    const registrationRequests = await User.find({
      role: "owner",
      status: "pending",
    });
    return res.status(200).json(registrationRequests);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching registration requests", error: err });
  }
};

export const acceptOwnerRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Update the status to "accepted"
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "accepted" }, // Change status to accepted
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Owner approved", user: updatedUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error approving owner", error: err });
  }
};

export const declineOwnerRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Update the status to "declined" instead of deleting the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "declined" }, // Change status to declined
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Owner registration request declined",
      user: updatedUser,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error declining registration request", error: err });
  }
};

export const addDecorator = async (req: Request, res: Response) => {
  const {
    username,
    password,
    firstName,
    lastName,
    gender,
    address,
    phone,
    email,
    firmId, // firmId can be null or undefined
  } = req.body;

  try {
    let firm = null;

    // If firmId is provided, check if the firm exists
    if (firmId) {
      firm = await Firm.findById(firmId);
      if (!firm) {
        console.log("Firm not found with id:", firmId);
        return res.status(404).json({ message: "Firm not found" });
      }
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log("Username or email already exists:", username, email);
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Create the decorator, linking to firm if firmId was provided
    const decorator = new User({
      username,
      password,
      firstName,
      lastName,
      role: "decorator",
      gender,
      address,
      phone,
      email,
      firm: firm ? firm._id : null, // Link to firm only if firmId was provided
    });

    // Save the decorator
    await decorator.save();
    console.log("Decorator saved successfully:", decorator);

    // If a firm was provided, link the decorator to the firm and update the firm
    if (firm) {
      firm.decorators.push(decorator._id);
      await firm.save();
      console.log("Firm updated successfully with new decorator:", firm);
    }

    // Return success response
    return res
      .status(201)
      .json({ message: "Decorator added successfully", decorator });
  } catch (err) {
    console.log("Error adding decorator:", err);
    return res
      .status(500)
      .json({ message: "Error adding decorator", error: err });
  }
};

export const addFirm = async (req: Request, res: Response) => {
  const {
    name,
    address,
    services,
    phone,
    location,
    holidayPeriod,
    decorators, // This is now an array of decorator ObjectIds
  } = req.body;

  try {
    // Create the new firm
    const firm = new Firm({
      name,
      address,
      services,
      phone,
      location,
      holidayPeriod,
    });

    // Save the firm to get the firm ID
    await firm.save();

    // Ensure at least 2 decorators are selected
    if (!decorators || decorators.length < 2) {
      return res
        .status(400)
        .json({ message: "A firm must have at least 2 decorators." });
    }

    // Check if the selected decorators are valid and not already associated with another firm
    const validDecorators = await User.find({
      _id: { $in: decorators },
      firm: { $exists: false }, // Ensure they are not already assigned to a firm
    });

    if (validDecorators.length !== decorators.length) {
      return res.status(400).json({
        message:
          "Some decorators are invalid or already associated with another firm.",
      });
    }

    // Associate the decorators with the firm
    validDecorators.forEach(async (decorator) => {
      decorator.firm = firm._id;
      await decorator.save();
    });

    // Add the decorator ObjectIds to the firm
    firm.decorators = decorators;
    await firm.save(); // Save the firm with the updated decorators list

    return res
      .status(201)
      .json({ message: "Firm added successfully with decorators", firm });
  } catch (err) {
    return res.status(500).json({ message: "Error adding firm", error: err });
  }
};
