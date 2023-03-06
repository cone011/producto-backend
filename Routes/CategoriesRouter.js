const express = require("express");
const router = express.Router();
const { param } = require("express-validator");
const categoriesController = require("../Controllers/CategoriesController");

router.get("/categoria", categoriesController.getAllCategories);

router.get(
  "/categoria/:categoryId",
  [param("categoryId").trim().isLength({ min: 6 })],
  categoriesController.getCategoryById
);

module.exports = router;
