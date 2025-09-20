import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { correo } = req.body;
    const user = await User.findOne({ correo });
    const token = jwt.sign({ user: user._id }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { nombre, correo, clave } = req.body;
    
    // Hashear la contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(clave, salt);
    
    // Crear nuevo usuario
    const newUser = new User({
      nombre,
      correo,
      clave: hashedPassword,
      validado: true // O false si necesitas verificación por correo
    });
    
    await newUser.save();
    
    // Crear token JWT
    const token = jwt.sign({ user: newUser._id }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    
    res.status(201).json({ 
      message: "Usuario registrado exitosamente",
      token
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { correo } = req.body;
    const user = await User.findOne({ correo });
    jwt.verify(req.headers["token"], process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" });
      }
      const refreshToken = jwt.sign({ user: user._id }, process.env.JWT_KEY, {
        expiresIn: "2h",
      });
      res.status(200).json({ token: refreshToken });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
