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
