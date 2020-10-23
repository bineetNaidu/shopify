import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.JWT_TOKEN);

export default (id, username, email) =>
  jwt.sign({ id, username, email }, process.env.JWT_TOKEN, {
    expiresIn: 3 * 24 * 60 * 60,
  });
