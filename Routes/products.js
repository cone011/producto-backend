const express = require("express");
const router = express.Router();
const { query, param } = require("express-validator");
const productsController = require("../Controllers/products");

router.get(
  "/productos",
  [query("categoryId").trim().isLength({ min: 6 })],
  productsController.getProducts
);

router.get(
  "/search-productos",
  [query("searchProduct").isLength({ min: 3 })],
  productsController.getSearchProduct
);

router.get(
  "/productos/:productId",
  [param("productId").trim().isLength({ min: 3 })],
  productsController.getProductoById
);

module.exports = router;
