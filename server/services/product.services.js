const Product = require("../model/Product");

function prepareQuery(params = {}) {
  const {
    productName,
    category,
    lastest,
    oldest,
    productPrice,
    productQuantity,
    id,
    exceptId,
  } = params;
  const filter = {};
  const sort = {};

  if (productName) {
    filter.productName = productName;
  }

  if (category) {
    filter.productCategory = category;
  }

  if (id) {
    filter._id = id;
  }

  if (exceptId) {
    filter._id = { ...filter._id, $ne: exceptId };
  }

  if (lastest) {
    sort._id = -1;
  } else if (oldest) {
    sort._id = 1;
  } else if (productPrice) {
    sort.productPrice = productPrice === "asc" ? 1 : -1;
  } else if (productQuantity) {
    sort.productQuantity = productQuantity === "asc" ? 1 : -1;
  }

  return { filter, sort };
}

function handlePaginateProducts(params = {}) {
  const { page = 1, limit = 25 } = params;

  const skip = (page - 1) * limit;

  return { skip, limit };
}

async function queryProducts({ filter, sort, skip, limit }) {
  const query = Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "productCategory",
      select: "categoryName",
    });

  if (!filter._id || (typeof filter._id === "object" && filter._id.$ne)) {
    query.select("-embedding -autoTags -imageUrl -uploadBy");
  }

  return await query;
}

async function fetchProductsFromDB(filter, sort, skip, limit) {
  const [products, total] = await Promise.all([
    queryProducts({ filter, sort, skip, limit }),
    Product.countDocuments(filter),
  ]);

  return {
    success: true,
    products,
    total,
  };
}

exports.handleQueryProducts = async (query) => {
  const { filter, sort } = prepareQuery(query);
  const { skip, limit } = handlePaginateProducts(query);

  return await fetchProductsFromDB(filter, sort, skip, limit);
};

exports.handleCreateProduct = async (query) => {};
