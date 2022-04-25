import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
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

export const userAuthenticate = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    const error = new Error('Usuario y/o contraseña errónea');
    return res.status(400).json({
      message: error.message
    });
  } else if (!user.confirmed) {
    const error = new Error('Cuenta no confirmada');
    return res.status(403).json({
      message: error.message
    });
  } else if (await user.verifyPassword(password)) {
    return res.status(200).json({
      _id: user._id,
      nombre: user.name,
      email: user.email,
      token: generateJWT(user._id)
    });
  } else {
    const error = new Error('Usuario y/o contraseña incorrecta');
    return res.status(400).json({
      message: error.message
    });
  }
};