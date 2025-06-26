import { Volunteer } from "../db/models/Volunteer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// Create a new volunteer
export const createVolunteer = async (req, res) => {
  try {
    const { name, email, phone, address, areasOfInterest, availability } =
      req.body;
    const userId = req.user._id;

    const volunteerExists = await Volunteer.findOne({ email });

    if (volunteerExists) {
      return res
        .status(409)
        .json(new ApiError(409, "Volunteer already registered"));
    }

    const newVolunteer = await Volunteer.create({
      name,
      email,
      phone,
      address,
      areasOfInterest,
      availability,
      userId,
    });

    return res
      .status(201)
      .json(new ApiResponse(newVolunteer, "Volunteer registered successfully"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message, err));
  }
};

// Get all volunteers with optional filter
export const getAllVolunteers = async (req, res) => {
  try {
    const { availability, area } = req.query;
    const filter = {};

    if (availability) filter.availability = availability;
    if (area) filter.areasOfInterest = area;

    const volunteers = await Volunteer.find(filter).populate(
      "userId",
      "name email"
    );

    return res.json(new ApiResponse(volunteers, "Fetched all volunteers"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message, err));
  }
};

// Get a volunteer by ID
export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!volunteer)
      return res.status(404).json(new ApiError(404, "Volunteer not found"));

    return res
      .status(200)
      .json(new ApiResponse(volunteer, "Fetched volunteer details"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message, err));
  }
};

// Update volunteer info
export const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer)
      return res.status(404).json(new ApiError(404, "Volunteer not found"));

    if (String(volunteer.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json(new ApiError(403, "Unauthorized to update this volunteer"));
    }

    const updates = req.body;
    Object.assign(volunteer, updates);

    await volunteer.save();

    return res
      .status(200)
      .json(new ApiResponse(volunteer, "Volunteer updated successfully"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message, err));
  }
};

// Delete a volunteer
export const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer)
      return res.status(404).json(new ApiError(404, "Volunteer not found"));

    if (String(volunteer.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json(new ApiError(403, "Unauthorized to delete this volunteer"));
    }

    await Volunteer.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(new ApiResponse({}, "Volunteer deleted successfully"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message, err));
  }
};

// Get all volunteers created by a specific user
export const getUserVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ userId: req.user._id });

    return res
      .status(200)
      .json(new ApiResponse(volunteers, "Fetched your volunteers"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message, err));
  }
};
