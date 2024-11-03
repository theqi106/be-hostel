import Acreage from "../models/acreage";

//GET ALL Acreage

export const getAcreage = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Acreage.find({});
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get prices",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
