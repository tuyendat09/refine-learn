const Category = require("../model/Category");
const { isValidObjectId } = require("mongoose");

exports.isCategoryExist = async (id) => {
  const category = await Category.findById(id);
  if (!isValidObjectId(id)) {
    return { success: false, code: "CATEGORY_NOT_EXIST" };
  }
  console.log(category);
  if (!category) {
    return { success: false, code: "CATEGORY_NOT_EXIST" };
  }
  return { success: true };
};

exports.checkDuplicatedCategory = async (categoryName) => {};
