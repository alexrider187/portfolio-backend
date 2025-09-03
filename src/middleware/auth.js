import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check user exists
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: "Not authorized, user not found" });
      }

      // Check if user is the real admin
      if (user.email !== process.env.ADMIN_EMAIL || user.role !== "admin") {
        return res.status(403).json({ error: "Access denied: admin only" });
      }

      // Attach user to request
      req.user = user;

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }
};
