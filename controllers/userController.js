import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import User from "../models/User.js";

export const userRegister = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error('Usuario ya registrado');
      return res.status(400).json({
        message: error.message
      });
    } else {
      const user = User(req.body);
      user.token = generateId();
      const savedUser = await user.save();
      res.json(savedUser);
      console.log(savedUser);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const userAuthenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (user === null) {
      const error = new Error('Usuario y/o contraseña incorrecta');
      return res.status(400).json({
        message: error.message
      });
    } else if (user.confirmed === false) {
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
      return res.status(401).json({
        message: error.message
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const userConfirm = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ token });

    if (user) {
      user.confirmed = true;
      user.token = '';
      await user.save();
      return res.status(200).json({
        message: 'Usuario confirmado'
      });
    } else {
      const error = new Error('Datos incorrectos');
      return res.status(400).json({
        message: error.message
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const userRecoverPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    try {
      user.token = generateId();
      await user.save();
      return res.status(200).json({
        message: 'Verificar la bandeja de entrada de su correo'
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  else {
    const error = new Error('Verificar la bandeja de entrada de su correo');
    return res.status(400).json({
      message: error.message
    });
  }
};

export const userRecoverPasswordToken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });

  if (user) {
    try {
      return res.status(200).json({
        message: 'Token válido'
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    const error = new Error('Token inválido');
    return res.status(400).json({
      message: error.message
    });
  }
};

export const userNewPasswordToken = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ token });
  if (user) {
    try {
      user.password = password;
      user.token = '';
      await user.save();
      return res.status(200).json({
        message: 'Nueva contraseña guardada'
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    const error = new Error('Token inválido');
    return res.status(400).json({
      message: error.message
    });
  }
};

export const userProfile = async (req, res) => {
  const { user } = await req;
  return res.status(200).json(user);
};