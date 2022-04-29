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
      await user.save();
      return res.status(200).json({
        message: 'Usuario registrado. Revisa tu email para confirmar tu cuenta.'
      });
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
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      user.token = generateId();
      await user.save();
      return res.status(200).json({
        message: 'Verificar la bandeja de entrada de su correo'
      });
    }
    else {
      const error = new Error('Verificar la bandeja de entrada de su correo');
      return res.status(400).json({
        message: error.message
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const userRecoverPasswordToken = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ token });

    if (user) {
      return res.status(200).json({
        message: 'Token válido'
      });
    } else {
      const error = new Error('Token inválido');
      return res.status(400).json({
        message: error.message
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const userNewPasswordToken = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ token });
    if (user) {
      user.password = password;
      user.token = '';
      await user.save();
      return res.status(200).json({
        message: 'Nueva contraseña guardada'
      });
    } else {
      const error = new Error('Token inválido');
      return res.status(400).json({
        message: error.message
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const userProfile = async (req, res) => {
  try {
    const { user } = await req;
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};