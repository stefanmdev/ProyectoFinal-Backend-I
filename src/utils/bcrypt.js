import bcrypt from 'bcrypt';

export const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
