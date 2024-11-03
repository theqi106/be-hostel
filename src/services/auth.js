import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
require("dotenv").config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({
  phone,
  password,
  name,
  zalo,
  fbUrl,
  avata,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ phone });

      if (user) {
        return resolve({
          err: 2,
          msg: "Phone number has already been used.",
          token: null,
        });
      }

      user = await User.create({
        phone,
        name,
        password: hashPassword(password),
        zalo: zalo || null,
        fbUrl: fbUrl || null,
        avata: avata || null,
      });

      const token = jwt.sign(
        {
          id: user._id,
          phone: user.phone,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );

      resolve({
        err: 0,
        msg: "Register is successful.",
        token,
      });
    } catch (err) {
      reject(err);
    }
  });
export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ phone });

      const isCorrectPassword =
        user && bcrypt.compareSync(password, user.password);

      const token =
        isCorrectPassword &&
        jwt.sign(
          {
            id: user._id,
            phone: user.phone,
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successful."
          : user
          ? "Password is wrong"
          : "Phone number not found",
        token: token || null,
      });
    } catch (err) {
      reject(err);
    }
  });
