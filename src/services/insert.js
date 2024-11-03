import bcrypt from "bcryptjs";
import nhachothue from "../../data/nhachothue.json";
import User from "../models/user";
import Post from "../models/post";
import Attribute from "../models/attribute";
import Image from "../models/images";
import Label from "../models/label";
import Overview from "../models/overview";
import Price from "../models/price";
import Acreage from "../models/acreage";
import Province from "../models/provine";
require("dotenv").config();
import generateCode from "../ultis/generateCode";
import { dataPrices, dataAcreages } from "../ultis/data";
import { getNumberFromString, getNumberFromStringV2 } from "../ultis/common";
const dataBody = nhachothue.body;
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const provinceCodes = [];
      const labelCodes = [];
      for (const item of dataBody) {
        let labelCode = generateCode(item?.header?.class?.classType).trim();
        labelCodes?.every((item) => item?.code !== labelCode) &&
          labelCodes.push({
            code: labelCode,
            value: item?.header?.class?.classType,
          });
        let provinceCode = generateCode(
          item?.header?.address?.split(",")?.slice(-1)[0]
        ).trim();
        provinceCodes?.every((item) => item?.code !== provinceCode) &&
          provinceCodes.push({
            code: provinceCode,
            value: item?.header?.address?.split(",")?.slice(-1)[0],
          });
        let currentAceage = getNumberFromString(
          item?.header?.attributes?.acreage
        );
        let currentPrice = getNumberFromString(item?.header?.attributes?.price);
        const attribute = await Attribute.create({
          price: item?.header?.attributes?.price,
          acreage: item?.header?.attributes?.acreage,
          publish: item?.header?.attributes?.published,
          hashtag: item?.header?.attributes?.hashtag,
        });
        const images = await Image.create({
          image: JSON.stringify(item?.images),
        });
        const overview = await Overview.create({
          code: item?.overview?.content.find((i) => i.name === "Mã tin:")
            ?.content,
          area: item?.overview?.content.find((i) => i.name === "Khu vực")
            ?.content,
          type: item?.overview?.content.find((i) => i.name === "Loại tin rao:")
            ?.content,
          target: item?.overview?.content.find(
            (i) => i.name === "Đối tượng thuê:"
          )?.content,
          bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
            ?.content,
        });
        const user = await User.create({
          name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
            .content,
          password: hashPassword("123456"),
          phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
            .content,
          zalo: item?.contact?.content.find((i) => i.name === "Zalo").content,
        });
        await Post.create({
          title: item.header?.title,
          star: item.header?.star,
          labelCode: labelCode,
          address: item.header?.address,
          attribute: attribute._id,
          categoryCode: "NCT",
          description: JSON.stringify(item.mainContent?.content),
          user: user._id,
          overview: overview._id,
          images: images._id,
          acreageCode: dataAcreages.find(
            (acreage) =>
              acreage.max > currentAceage && acreage.min <= currentAceage
          )?.code,
          priceCode: dataPrices.find(
            (price) => price.max > currentPrice && price.min <= currentPrice
          )?.code,
          provinceCode: provinceCode,
          priceNumber: getNumberFromStringV2(item?.header?.attributes?.price),
          acreageNumber: getNumberFromStringV2(
            item?.header?.attributes?.acreage
          ),
        });
      }
      provinceCodes.forEach(async (item) => {
        await Province.create(item);
      });
      labelCodes.forEach(async (item) => {
        await Label.create(item);
      });

      resolve("Done");
    } catch (err) {
      reject(err);
    }
  });
export const createPriceAnhAcreage = () =>
  new Promise(async (resolve, reject) => {
    try {
      dataPrices.forEach(async (item) => {
        await Price.create({
          code: item.code,
          value: item.value,
        });
      });
      dataAcreages.forEach(async (item) => {
        await Acreage.create({
          code: item.code,
          value: item.value,
        });
      });
      resolve("OK");
    } catch (error) {
      throw error;
    }
  });
