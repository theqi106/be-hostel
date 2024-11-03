import Price from "../models/price";

//GET ALL Price

export const getPrice = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Price.find({});
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get prices",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });