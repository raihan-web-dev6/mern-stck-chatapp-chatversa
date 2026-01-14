import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token || typeof token !== "string") {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAuth;
