const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

router.get("/", categoryController.handleQueryCategories);
router.delete("/:id", categoryController.handleDeleteCategory);

module.exports = router;
