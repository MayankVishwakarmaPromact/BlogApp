import { User } from "../models/User.model.js";

export const login = async (req, res) => {
  try {
    const userCredentials = req.body;
    const user = await User.find({
      email: userCredentials.email,
      password: userCredentials.password,
    });
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
