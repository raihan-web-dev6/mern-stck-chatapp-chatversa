import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import gentoken from "../config/token.js";

// signup controller

 
 
 export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 7) {
      return res.status(400).json({ message: "Password must be at least 7 characters" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

     // ✅ FIXED HERE
    const token = await gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 8 * 24 * 60 * 60 * 1000
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



 // login controller

 export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = await gentoken(user._id);

    // ✅ FIXED HERE
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 8 * 24 * 60 * 60 * 1000,
      sameSite: "lax",   // IMPORTANT
      secure: false
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `Login error: ${error.message}`,
    });
  }
};


export const logout= async (req, res) =>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        return res.status(500).json({message:`error in logout ${error.message}`})
    }
}