const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchame = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("Category", categorySchame, "categories");
