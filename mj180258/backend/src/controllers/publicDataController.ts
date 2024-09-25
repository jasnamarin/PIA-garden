import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { Firm } from "../models/Firm";
import moment from "moment";
import { Request, Response } from "express";

export const getLandingPageData = async (req: Request, res: Response) => {
  try {
    const completedGardens = await Appointment.countDocuments({
      status: "completed",
    });
    const totalOwners = await User.countDocuments({ role: "owner" });
    const totalDecorators = await User.countDocuments({ role: "decorator" });

    // Count appointments in specific time ranges
    const now = new Date();
    const last24Hours = moment(now).subtract(24, "hours").toDate();
    const last7Days = moment(now).subtract(7, "days").toDate();
    const last30Days = moment(now).subtract(30, "days").toDate();

    const appointmentsLast24Hours = await Appointment.countDocuments({
      date: { $gte: last24Hours },
    });
    const appointmentsLast7Days = await Appointment.countDocuments({
      date: { $gte: last7Days },
    });
    const appointmentsLast30Days = await Appointment.countDocuments({
      date: { $gte: last30Days },
    });

    // Firms with currently engaged decorators
    const firms = await Firm.find().populate(
      "decorators",
      "firstName lastName"
    );

    res.status(200).json({
      completedGardens,
      totalOwners,
      totalDecorators,
      appointments: {
        last24Hours: appointmentsLast24Hours,
        last7Days: appointmentsLast7Days,
        last30Days: appointmentsLast30Days,
      },
      firms,
    });
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
