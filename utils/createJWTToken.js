import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.JWT_TOKEN);

export default (id, username, email, isAdmin) =>
  jwt.sign({ id, username, email, isAdmin }, process.env.JWT_TOKEN, {
    expiresIn: 3 * 24 * 60 * 60,
  });
