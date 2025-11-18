const Category = require("../model/Category");
const categoryUtils = require("../utils/categories.utils");

function handlePaginateCategory(params = {}) {
  const { page = 1, limit = 25 } = params;
  const skip = (page - 1) * limit;
  return { skip, limit, currentPage: page };
}

async function queryCategory({ skip, limit }) {
  const [categories, total] = await Promise.all([
    Category.find().skip(skip).limit(limit),
    Category.countDocuments(), // tính tổng
  ]);

  return { categories, total };
}

exports.handleQueryCategories = async (page = 1, limit = 25) => {
  const pagination = handlePaginateCategory({ page, limit });
  const { categories, total } = await queryCategory(pagination);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    data: {
      categories,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    },
  };
};

exports.handleDeleteCategory = async (id) => {
  const verifyExist = await categoryUtils.isCategoryExist(id);
  if (!verifyExist.success) return verifyExist;
  await Category.findByIdAndDelete(id);
  return { success: true };
};
