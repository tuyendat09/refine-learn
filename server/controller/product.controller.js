const asyncHandler = require("../middleware/asyncHandler");
const productServices = require("../services/product.services");

exports.handleQueryProduct = asyncHandler(async (req, res) => {
  const query = req.query;
  console.log(query);

  const { success, products, total } =
    await productServices.handleQueryProducts(query);
  return res
    .status(200)
    .json({ success: success, products: products, total: total });
});

exports.handleCreateproduct = asyncHandler(async(req,res) => {
  const newProductData = req.body
  
})
