import User from "../models/user";
import mongoose from "mongoose";
//GET CURRENT USER
export const getOneUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await User.findOne({ _id: id }, "-password");
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get user",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
//Edit CURRENT USER
export const editUser = ({ payload, id }) =>
  new Promise(async (resolve, reject) => {
    console.log("id", id);
    try {
      const response = await User.updateOne({ _id: id }, { $set: payload });
      resolve({
        err: response.modifiedCount > 0 ? 0 : 1,
        msg: response.modifiedCount > 0 ? "Updated" : "Fail to edit user",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
