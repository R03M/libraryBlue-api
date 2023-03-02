import "dotenv/config";
import bcrypt from "bcrypt";
const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const hashPassW = (plaintextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

export const comparePass = (plaintextPassword, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintextPassword, hashedPassword, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
