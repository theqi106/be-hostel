import Post from "../models/post";
import Overview from "../models/overview";
import Attribute from "../models/attribute";
import Image from "../models/images";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import Province from "../models/provine";
import Label from "../models/label";
import generateDate from "../ultis/generateDate";
import mongoose from "mongoose";
import { response } from "express";
export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Post.aggregate([
        {
          $lookup: {
            from: "attributes",
            localField: "attribute",
            foreignField: "_id",
            as: "attribute",
          },
        },
        {
          $unwind: "$attribute",
        },
        {
          $lookup: {
            from: "labels",
            localField: "labelCode",
            foreignField: "labelCode",
            as: "label",
          },
        },
        {
          $unwind: "$attribute",
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "overviews",
            localField: "overview",
            foreignField: "_id",
            as: "overview",
          },
        },
        {
          $unwind: "$overview",
        },
        {
          $lookup: {
            from: "images",
            localField: "images",
            foreignField: "_id",
            as: "images",
          },
        },
        {
          $unwind: "$images",
        },
      ]);
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get posts failed",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
export const deletePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Post.deleteOne({ _id: postId });
      resolve({
        err: response.deletedCount > 0 ? 0 : 1,
        msg: response.deletedCount > 0 ? "OK" : "Delete posts failed",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
export const getPostsLimitService = (
  skip,
  { limitPost, ...query },
  { priceNumber, acreageNumber }
) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !query.page || +query.page <= 1 ? 0 : +query.page - 1;
      const limit = +limitPost || +process.env.LIMIT;

      const pipeline = [
        {
          $sort: { createdAt: -1 },
        },
      ];
      if (query.id) {
        pipeline.push({
          $match: { _id: new mongoose.Types.ObjectId(query.id) },
        });
      }
      if (
        priceNumber &&
        Array.isArray(priceNumber) &&
        priceNumber.length === 2
      ) {
        const minPrice = Number(priceNumber[0]);
        const maxPrice = Number(priceNumber[1]);

        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          pipeline.push({
            $match: {
              priceNumber: { $gte: minPrice, $lte: maxPrice },
            },
          });
        }
      }
      if (
        acreageNumber &&
        Array.isArray(acreageNumber) &&
        acreageNumber.length === 2
      ) {
        const minAcreage = Number(acreageNumber[0]);
        const maxAcreage = Number(acreageNumber[1]);
        if (!isNaN(minAcreage) && !isNaN(maxAcreage)) {
          pipeline.push({
            $match: {
              acreageNumber: { $gte: minAcreage, $lte: maxAcreage },
            },
          });
        }
      }

      if (
        (query.priceCode || query.acreageCode) &&
        Object.keys(query).length > 0
      ) {
        pipeline.push({
          $match: {
            ...(query.priceCode && { priceCode: { $in: query.priceCode } }),
            ...(query.acreageCode && {
              acreageCode: { $in: query.acreageCode },
            }),
          },
        });
      }
      if (query.categoryCode) {
        pipeline.push({
          $match: {
            categoryCode: Array.isArray(query.categoryCode)
              ? { $in: query.categoryCode }
              : query.categoryCode,
          },
        });
      }
      if (query.provinceCode) {
        pipeline.push({
          $match: {
            provinceCode: { $in: query.provinceCode },
          },
        });
      }
      if (query.labelCode) {
        pipeline.push({
          $match: {
            labelCode: Array.isArray(query.labelCode)
              ? { $in: query.labelCode }
              : query.labelCode,
          },
        });
      }
      const countPipeline = [...pipeline];
      pipeline.push(
        {
          $lookup: {
            from: "attributes",
            localField: "attribute",
            foreignField: "_id",
            as: "attribute",
          },
        },
        {
          $unwind: "$attribute",
        },
        {
          $lookup: {
            from: "labels",
            localField: "labelCode",
            foreignField: "code",
            as: "label",
          },
        },
        {
          $lookup: {
            from: "provinces",
            localField: "provinceCode",
            foreignField: "code",
            as: "province",
          },
        },
        {
          $unwind: "$label",
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "overviews",
            localField: "overview",
            foreignField: "_id",
            as: "overview",
          },
        },
        {
          $unwind: "$overview",
        },
        {
          $lookup: {
            from: "images",
            localField: "images",
            foreignField: "_id",
            as: "images",
          },
        },
        {
          $unwind: "$images",
        },
        {
          $skip: offset * limit,
        },
        {
          $limit: limit,
        }
      );
      const totalCount = await Post.aggregate([
        ...countPipeline,
        { $count: "totalPosts" },
      ]);
      const response = await Post.aggregate(pipeline);
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get posts failed",
        totalCount: totalCount[0]?.totalPosts || 0,
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
export const getPostsLimitAdminService = (skip, id, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !query.page || +query.page <= 1 ? 0 : +query.page - 1;
      const pipeline = [
        {
          $sort: { createdAt: -1 },
        },
        {
          $match: { user: new mongoose.Types.ObjectId(id) },
        },
      ];
      if (query.categoryCode) {
        pipeline.push({
          $match: {
            categoryCode: Array.isArray(query.categoryCode)
              ? { $in: query.categoryCode }
              : query.categoryCode,
          },
        });
      }
      if (query.provinceCode) {
        pipeline.push({
          $match: {
            provinceCode: { $in: query.provinceCode },
          },
        });
      }
      const countPipeline = [...pipeline];
      pipeline.push(
        {
          $lookup: {
            from: "attributes",
            localField: "attribute",
            foreignField: "_id",
            as: "attribute",
          },
        },
        {
          $unwind: "$attribute",
        },
        {
          $lookup: {
            from: "labels",
            localField: "labelCode",
            foreignField: "code",
            as: "label",
          },
        },
        {
          $lookup: {
            from: "provinces",
            localField: "provinceCode",
            foreignField: "code",
            as: "province",
          },
        },
        {
          $unwind: "$label",
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "overviews",
            localField: "overview",
            foreignField: "_id",
            as: "overview",
          },
        },
        {
          $unwind: "$overview",
        },
        {
          $lookup: {
            from: "images",
            localField: "images",
            foreignField: "_id",
            as: "images",
          },
        },
        {
          $unwind: "$images",
        },
        {
          $skip: offset * +process.env.LIMIT,
        },
        {
          $limit: +process.env.LIMIT,
        }
      );
      const totalCount = await Post.aggregate([
        ...countPipeline,
        { $count: "totalPosts" },
      ]);
      const response = await Post.aggregate(pipeline);
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get posts failed",
        totalCount: totalCount[0]?.totalPosts || 0,
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
export const updatePost = ({
  postId,
  imageId,
  attributeId,
  overviewId,
  ...body
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body.label);
      await Attribute.updateOne(
        { _id: attributeId },
        {
          $set: {
            price:
              +body.priceNumber < 1
                ? `${+body.priceNumber * 1000000} đồng/ tháng`
                : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.acreageNumber} m2`,
          },
        }
      );
      await Overview.updateOne(
        { _id: overviewId },
        {
          $set: {
            area: body?.address?.split(",")[1] || null,
            type: body.category || null,
            target: body.target || null,
          },
        }
      );

      await Image.updateOne(
        { _id: imageId },
        {
          $set: {
            image: JSON.stringify(body.images),
          },
        }
      );
      Province.findOneAndUpdate(
        {
          $or: [
            { code: generateCode(body?.province?.replace("Thành phố", "")) },
            { code: generateCode(body?.province?.replace("Tỉnh", "")) },
          ],
        },
        {
          $setOnInsert: {
            code: body.province.includes("Thành phố")
              ? generateCode(body?.province?.replace("Thành phố", ""))
              : generateCode(body?.province?.replace("Tỉnh", "")),
            value: body.province.includes("Thành phố")
              ? body?.province?.replace("Thành phố", "")
              : body?.province?.replace("Tỉnh", ""),
          },
        },
        { upsert: true, new: true }
      );
      await Label.findOneAndUpdate(
        {
          code: labelCode,
        },
        {
          $setOnInsert: {
            code: labelCode,
            value: body.label,
          },
        },
        { upsert: true, new: true }
      );

      await Post.updateOne(
        { _id: postId },
        {
          $set: {
            title: body.title,
            labelCode: labelCode,
            address: body.address || null,
            categoryCode: body.categoryCode || null,
            description: body.description
              ? JSON.stringify(body.description)
              : null,
            acreageCode: body.acreageCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body.province
              ? body.province.includes("Thành phố")
                ? generateCode(body.province.replace("Thành phố", "").trim())
                : generateCode(body.province.replace("Tỉnh", "").trim())
              : null,
            priceNumber: body.priceNumber || null,
            acreageNumber: body.acreageNumber || null,
          },
        }
      );
      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (err) {
      reject(err);
    }
  });
export const getNewPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Post.aggregate([
        {
          $lookup: {
            from: "attributes",
            localField: "attribute",
            foreignField: "_id",
            as: "attribute",
          },
        },
        {
          $unwind: "$attribute",
        },
        {
          $lookup: {
            from: "labels",
            localField: "labelCode",
            foreignField: "labelCode",
            as: "label",
          },
        },
        {
          $unwind: "$attribute",
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "overviews",
            localField: "overview",
            foreignField: "_id",
            as: "overview",
          },
        },
        {
          $unwind: "$overview",
        },
        {
          $lookup: {
            from: "images",
            localField: "images",
            foreignField: "_id",
            as: "images",
          },
        },
        {
          $unwind: "$images",
        },
        {
          $skip: 0,
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: +process.env.LIMIT,
        },
      ]);
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get posts failed",
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
export const createNewPostService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body.label);
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const curentDate = generateDate();
      const attribute = await Attribute.create({
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/ tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${body.acreageNumber} m2`,
        publish: moment(new Date()).format("DD/MM/YYYY"),
        hashtag: hashtag,
      });
      const overview = await Overview.create({
        code: hashtag,
        area: body?.address?.split(",")[1],
        type: body.category,
        target: body.target,
        bonus: "Tin thường",
        createdAt: curentDate.today.today,
        expired: curentDate.expiredDay.today,
      });
      const images = await Image.create({
        image: JSON.stringify(body.images),
      });
      await Province.findOneAndUpdate(
        {
          $or: [
            { code: generateCode(body?.province?.replace("Thành phố", "")) },
            { code: generateCode(body?.province?.replace("Tỉnh", "")) },
          ],
        },
        {
          $setOnInsert: {
            code: body.province.includes("Thành phố")
              ? generateCode(body?.province?.replace("Thành phố", ""))
              : generateCode(body?.province?.replace("Tỉnh", "")),
            value: body.province.includes("Thành phố")
              ? body?.province?.replace("Thành phố", "")
              : body?.province?.replace("Tỉnh", ""),
          },
        },
        { upsert: true, new: true }
      );
      await Label.findOneAndUpdate(
        {
          code: labelCode,
        },
        {
          $setOnInsert: {
            code: labelCode,
            value: body.label,
          },
        },
        { upsert: true, new: true }
      );

      await Post.create({
        title: body.title || null,
        labelCode: labelCode,
        address: body.address || null,
        attribute: attribute._id,
        categoryCode: body.categoryCode || null,
        description: JSON.stringify(body.description) || null,
        user: userId,
        overview: overview._id,
        images: images._id,
        acreageCode: body.acreageCode || null,
        priceCode: body.priceCode || null,
        provinceCode: body.province.includes("Thành phố")
          ? generateCode(body?.province?.replace("Thành phố", ""))
          : generateCode(body?.province?.replace("Tỉnh", "")) || null,
        priceNumber: body.priceNumber || null,
        acreageNumber: body.acreageNumber || null,
      });
      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (err) {
      reject(err);
    }
  });
