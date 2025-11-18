const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.verifyUserExist = async (username) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    return { success: false, code: "USER_NOT_EXIST" };
  }

  return { success: true, user: user };
};

exports.handleCheckDuplicatedUser = async (username) => {
  const isUserExist = await this.verifyUserExist(username);

  if (isUserExist.success) {
    return { success: false, code: "USER_EXIST" };
  }

  return { success: true };
};

exports.handleVerifyUserPassword = async (username, password) => {
  const isUserExist = await this.verifyUserExist(username);
  if (!isUserExist.success) return isUserExist;

  const compareResult = bcrypt.compareSync(password, isUserExist.user.password);

  if (!compareResult) {
    return { success: false, code: "INVALID_PASSWORD" };
  }
  return { success: true, user: isUserExist.user };
};
