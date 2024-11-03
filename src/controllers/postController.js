import * as postService from "../services/post";

export const getPost = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + err,
    });
  }
};
export const getPostLimit = async (req, res) => {
  const { skip, priceNumber, acreageNumber, ...query } = req.query;
  try {
    const response = await postService.getPostsLimitService(skip, query, {
      priceNumber,
      acreageNumber,
    });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + err,
    });
  }
};
export const getPostLimitAdmin = async (req, res) => {
  const { skip, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await postService.getPostsLimitAdminService(
      skip,
      id,
      query
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + err,
    });
  }
};
export const updatPost = async (req, res) => {
  const { postId, imageId, attributeId, overviewId, ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id || !imageId || !attributeId || !overviewId)
      return res.status(400).json({
        err: 1,
        msg: "Missing postId",
      });
    const response = await postService.updatePost(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + err,
    });
  }
};
export const deletePost = async (req, res) => {
  const { postId } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing postId",
      });
    const response = await postService.deletePost(postId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + err,
    });
  }
};

export const getNewPost = async (req, res) => {
  try {
    const response = await postService.getNewPostService();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + err,
    });
  }
};
export const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, acreageNumber, label } = req.body;
    const { id } = req.user;
    if (
      !categoryCode ||
      !id ||
      !title ||
      !priceNumber ||
      !label ||
      !acreageNumber
    )
      return res.status(401).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await postService.createNewPostService(req.body, id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + err,
    });
  }
};
