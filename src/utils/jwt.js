import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secretKey123";

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
