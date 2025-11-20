const asyncHandler = require("../middleware/asyncHandler");
const categoryServices = require("../services/category.services");

exports.handleQueryCategories = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const { data } = await categoryServices.handleQueryCategories(page, limit);
  return res.status(200).json({ success: true, data: data });
});

exports.handleDeleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { success, code } = await categoryServices.handleDeleteCategory(id);
  console.log(success);
  if (!success) {
    let message = "Something wrong ";
    let httpCode = 400;
    switch (code) {
      case "CATEGORY_NOT_EXIST":
        message = "Category not found";
        httpCode = 406;
        break;

      default:
        break;
    }
    return res.status(httpCode).json({ success: false, message: message });
  }
  return res.status(200).json({ success: true });
});

exports.handleCreateCategory = asyncHandler(async (req, res) => {
  const { newCategoryName } = req.body;
  const { success, code } = await categoryServices.handleCreateCategory(
    newCategoryName
  );

  if (!success) {
    let message = "Something wrong :(";
    let httpCode = 400;
    switch (code) {
      case "EMPTY_DATA":
        message = "Please field required field";
        httpCode = 406;
        break;
      case "CATEGORY_EXIST":
        message = "Look like this category exist";
        httpCode = 406;
        break;
    }
    res.status(httpCode).json({ success: false, message: message });
  }

  return res
    .status(200)
    .json({ success: true, message: "New category created!" });
});

exports.handleGetOneCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { success, code, category } =
    await categoryServices.handleGetOneCategory(id);
  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "CATEGORY_NOT_EXIST":
        message = "Category not found!";
        break;
    }
    return res.status(406).json({ success: false, message: message });
  }
  setTimeout(() => {
    return res.status(200).json({
      success: true,
      category: category,
      message: "Get Category Complete",
    });
  }, 2000);
});

exports.handleUpdateCategory = asyncHandler(async (req, res) => {
  console.log("call");
  const { id } = req.params;
  const { newCategoryName } = req.body;

  const { success, code } = await categoryServices.handleUpdateCategory(
    id,
    newCategoryName
  );

  if (!success) {
    let message = "Something went wrong :(";
    let httpCode = 400;

    switch (code) {
      case "CATEGORY_NOT_EXIST":
        message = "Category not found!";
        break;
      case "EMPTY_DATA":
        message = "Please provide all required fields";
        httpCode = 406;
        break;
      case "CATEGORY_EXIST":
        message = "This category already exists";
        httpCode = 406;
        break;
    }

    return res.status(httpCode).json({ success: false, message: message });
  }

  setTimeout(() => {
    return res
      .status(200)
      .json({ success: true, message: "Category updated successfully" });
  }, 3000); // Simulating some delay
});
