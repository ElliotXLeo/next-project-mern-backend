import User from "../models/User.js";

export const userCreate = async (req, res) => {
  try {
    const user = User(req.body)
    const saveUser = await user.save();
    res.json(saveUser);
    console.log(saveUser);
  } catch (error) {
    console.log(error.message);
  }
  
};