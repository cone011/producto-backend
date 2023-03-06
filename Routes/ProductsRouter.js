const express = require("express");
const router = express.Router();
const { query } = require("express-validator");
const productsController = require("../Controllers/ProductsController");

router.get(
  "/productos",
  [query("categoryId").trim().isLength({ min: 6 })],
  productsController.getProducts
);

//rtx 3080
router.get(
  "/search-productos",
  [query("searchProduct").isLength({ min: 3 })],
  productsController.getSearchProduct
);

module.exports = router;
