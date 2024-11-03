import Category from "../models/category";

//GET ALL CATEGORIES

export const getCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Category.find({});
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get categories",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
