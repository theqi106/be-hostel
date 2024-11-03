import * as services from "../services/user";

export const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getOneUser(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at user controller : " + err,
    });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  console.log("id controller", id);
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "Missing payload",
      });
    const response = await services.editUser({ payload, id });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at user controller : " + err,
    });
  }
};
