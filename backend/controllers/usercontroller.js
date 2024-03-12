import { allUsers, authHelper, registerHelper } from "../helpers/userHelper.js";

import genToken from "../utils/genToken.js";

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authResult = await authHelper(email, password);

    if (authResult.error) {
      return res.status(401).json({ error: authResult.error });
    }

    const { _id, name } = authResult;
    genToken(res, _id);
    res.status(201).json({
      _id,
      name,
      email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const userDetails = await registerHelper(name, email, password, address);
    if (userDetails.error) {
      return res.status(401).json({ error: userDetails.error });
    }
    if (userDetails) {
      const { _id } = userDetails;

      genToken(res, _id);

      res.status(201).json({
        _id,
        name,
        email,
        address,
      });
    } else {
      res.status(400);
      throw new Error("invalid user data");
    }
  } catch (err) {
    console.log(err);
  }
};
const logOutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " user logout" });
};

const getUsers = async (req, res) => {
  const userDetails = await allUsers();

  res.status(200).json({
    userDetails,
  });
};
export { authUser, registerUser, logOutUser, getUsers };
