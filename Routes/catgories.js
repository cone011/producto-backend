const express = require("express");
const router = express.Router();
const { param } = require("express-validator");
const categoriesController = require("../Controllers/categories");
const isAuth = require("../middleware/isAuth");

router.get("/categoria", isAuth, categoriesController.getAllCategories);

router.get(
  "/categoria/:categoryId",
  isAuth,
  [param("categoryId").trim().isLength({ min: 6 })],
  categoriesController.getCategoryById
);

module.exports = router;
