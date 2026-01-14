import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";



// Get current logged-in user
export const getcurrentuser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get Current User Error:", error);
    return res.status(500).json({ message: `Get Current User Error: ${error.message}` });
  }
};

// Edit profile
export const editprofile = async (req, res) => {
  try {
    const { name } = req.body;

    const updateData = {};
    if (name) updateData.name = name;

    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      updateData.image = imageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Edit Profile Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get all other users except current
export const getotherusers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Get Other Users Error:", error);
    return res.status(500).json({ message: `Get Other Users Error: ${error.message}` });
  }
};
