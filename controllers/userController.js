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

export const userConfirm = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });

  if (user) {
    try {
      user.confirmed = true;
      user.token = '';
      await user.save();
      return res.status(200).json({
        message: 'Usuario confirmado'
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    const error = new Error('Datos incorrectos');
    return res.status(400).json({
      message: error.message
    });
  }
};

export const recoverPassword = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    try {
      existingUser.token = generateId();
      await existingUser.save();
      return res.status(200).json({
        message: 'Verificar su correo'
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  else {
    const error = new Error('Verificar su correo');
    return res.status(400).json({
      message: error.message
    });
  }
};

export const recoverPasswordToken = async (req, res) => {
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

export const newPasswordToken = async (req, res) => {
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