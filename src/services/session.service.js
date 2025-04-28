import UserDao from "../dao/UserDao.js"; 
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const userDao = new UserDao();

// Crear un nuevo usuario
export const createUser = async ({ first_name, last_name, email, age, password }) => {
  const exists = await userDao.getByEmail(email);
  if (exists) {
    throw new Error("El usuario ya existe");
  }

  const hashedPassword = createHash(password);

  const newUser = await userDao.create({
    first_name,
    last_name,
    email,
    age,
    password: hashedPassword,
  });

  return newUser;
};

// Autenticar usuario (login)
export const authenticateUser = async (email, password) => {
  const user = await userDao.getByEmail(email);
  if (!user || !isValidPassword(password, user.password)) {
    throw new Error("Credenciales inválidas");
  }
  return user;
};
