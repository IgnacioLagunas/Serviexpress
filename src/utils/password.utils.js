import bcrypt from 'bcrypt';

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isPasswordValid = (user, password) => {
  if (!user.password) return false;
  return bcrypt.compareSync(password, user.password);
};
