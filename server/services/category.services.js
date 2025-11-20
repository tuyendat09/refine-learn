const Category = require("../model/Category");
const verifyUtils = require("../utils/verify.utils");

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
  const verifyExist = await verifyUtils.isCategoryExist(id);
  if (!verifyExist.success) return verifyExist;
  await Category.findByIdAndDelete(id);
  return { success: true };
};

async function handleSaveCategoryToDb(newCategoryName) {
  const newCategory = new Category({ categoryName: newCategoryName });
  await newCategory.save();
}

exports.handleCreateCategory = async (newCategoryName) => {
  const emptyDataResult = verifyUtils.verifyEmptyData(newCategoryName, []);
  if (!emptyDataResult.success) return emptyDataResult;

  const duplicatedResult = await verifyUtils.handleCheckDuplicatedCategory(
    newCategoryName
  );
  if (!duplicatedResult.success) return duplicatedResult;
  await handleSaveCategoryToDb(newCategoryName);
  return { success: true, message: "Category created" };
};

exports.handleGetOneCategory = async (categoryId) => {
  const verifyCategoryResult = await verifyUtils.isCategoryExist(categoryId);
  if (!verifyCategoryResult.success) return verifyCategoryResult;
  return { success: true, category: verifyCategoryResult.category };
};

async function handleEditCategoryName(category, newCategoryName) {
  category.categoryName = newCategoryName;
  await category.save();
}

exports.handleUpdateCategory = async (id, newCategoryName) => {
  const verifyCategoryExist = await verifyUtils.isCategoryExist(id);
  if (!verifyCategoryExist.success) return verifyCategoryExist;

  // CHECK EMPTY DATA
  const verifyEmptyData = verifyUtils.verifyEmptyData(newCategoryName, []);
  if (!verifyEmptyData.success) return verifyEmptyData;

  // CHECK Duplicated Category Name
  const verifyCategoryResult = await verifyUtils.handleCheckDuplicatedCategory(
    newCategoryName
  );
  if (!verifyCategoryResult.success) return verifyCategoryResult;

  // Edit category name
  await handleEditCategoryName(verifyCategoryExist.category, newCategoryName);

  return { success: true };
};
