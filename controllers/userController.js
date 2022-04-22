import generateId from "../helpers/generateId.js";
import User from "../models/User.js";

export const userCreate = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({
      message: error.message
    });
  } else {
    try {
      const user = User(req.body);
      user.token = generateId();
      const saveUser = await user.save();
      res.json(saveUser);
      console.log(saveUser);
    } catch (error) {
      console.log(error.message);
    }
  }
};