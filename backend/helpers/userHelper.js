import User from "../models/usermodel.js";

const authHelper = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
    } else {
      return { error: "Invalid email or password" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
};
const registerHelper = async (name, email, password, address) => {
  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return { error: "User Already exists" };
    }
    const user = await User.create({
      name,
      email,
      password,
      address,
    });
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
    };
  } catch (error) {
    console.log(error);
    return { error: "Internal server error" };
  }
};

const allUsers = async () => {
  const users = await User.find().select('name email address _id');
  return users;
};
export { authHelper, registerHelper, allUsers };
