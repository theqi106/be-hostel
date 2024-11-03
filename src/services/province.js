import Province from "../models/provine";

//GET ALL Province

export const getProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Province.find({});
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get province",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
