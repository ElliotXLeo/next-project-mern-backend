import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decryptedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decryptedToken.id).select('-password -confirmed -token -createdAt -updatedAt -__v');
      return next();
    } catch (error) {
      return res.status(404).json({
        message: error.message
      });
    }
  }
  
  if (!token) {
    const error = new Error('Token inválido');
    return res.status(400).json({
      message: error.message
    });
  }
  next();
}

export default checkAuth;