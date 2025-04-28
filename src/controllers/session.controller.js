import { createUser, authenticateUser } from "../services/session.service.js";
import { generateToken } from "../utils/jwt.js";
import UserDTO from "../dto/UserDTO.js";

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const newUser = await createUser({ first_name, last_name, email, age, password });
    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);

    const token = generateToken({ id: user._id, role: user.role });

    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login exitoso", user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Current (usuario actual)
export const current = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }
    const userDTO = new UserDTO(req.user);
    res.json({
      status: "success",
      user: userDTO
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
