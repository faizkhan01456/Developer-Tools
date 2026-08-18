import { hash, compare } from "bcryptjs";

async function hashPassword(password) {
  return hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}

export default {
  hashPassword,
  comparePassword
};