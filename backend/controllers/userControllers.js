import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "holaamigo";

export const register = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.email || !data.password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    console.log(encryptedPassword);
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: encryptedPassword,
    });
    if (user) {
      res
        .status(200)
        .json({ message: "User registered succefully", data: user });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const userCredentials = req.body;
    const user = await User.findOne({
      email: userCredentials.email,
    });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(
      userCredentials.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const expirationTimeInSeconds =
      Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60; // 15 days in seconds

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: expirationTimeInSeconds,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

export const verifyLogin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
