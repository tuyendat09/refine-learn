const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

router.get("/:id", categoryController.handleGetOneCategory);
router.get("/", categoryController.handleQueryCategories);
router.post("/", categoryController.handleCreateCategory);
router.patch("/:id", categoryController.handleUpdateCategory);
router.delete("/:id", categoryController.handleDeleteCategory);

module.exports = router;
