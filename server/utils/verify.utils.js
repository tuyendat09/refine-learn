const User = require("../model/User");
const ObjectId = require("mongoose").Types.ObjectId;
const Category = require("../model/Category");
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

exports.isCategoryExist = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { success: false, code: "CATEGORY_NOT_EXIST" };
  }

  const category = await Category.findById(id);

  if (!category) {
    return { success: false, code: "CATEGORY_NOT_EXIST" };
  }
  return { success: true, category: category };
};

exports.handleCheckDuplicatedCategory = async (categoryName) => {
  console.log(categoryName);
  const category = await Category.findOne({ categoryName: categoryName });
  if (category) {
    return { success: false, code: "CATEGORY_EXIST" };
  }
  return { success: true };
};

exports.verifyEmptyData = (data, exclude = []) => {
  const CODE = "EMPTY_DATA";

  const isEmpty = (value) =>
    value === undefined || value === null || value === "";

  const shouldCheck = (key) => !exclude.includes(key);

  if (!Array.isArray(data)) {
    for (const key in data) {
      if (shouldCheck(key) && isEmpty(data[key])) {
        return { success: false, code: CODE };
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      for (const key in item) {
        if (shouldCheck(key) && isEmpty(item[key])) {
          return { success: false, code: CODE };
        }
      }
    }
  }

  return { success: true };
};
