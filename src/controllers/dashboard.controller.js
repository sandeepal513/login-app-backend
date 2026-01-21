import jwt from "jsonwebtoken";
import Users from "../models/user.model.js";
import { secret_key } from "../config/jwt_config.js";

const tokenVerify = (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, secret_key);
    console.log(decoded);

    return res.status(200).json({
      message: "Token is valid",
      user: decoded,
    });

  } catch (error) {
    return res.status(401).json({
      message: "Token expired or invalid",
      error: error.message,
    });
  }
};

const dashboardDetails = async (req, res) => {
  try {
    const usercount = await Users.countDocuments();

    return res.status(200).json({
      usercount,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
    dashboardDetails,
    tokenVerify,
}
