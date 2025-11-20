const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },

    productCategory: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("Product", productSchema, "products");
