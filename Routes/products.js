const express = require("express");
const router = express.Router();
const { query, param } = require("express-validator");
const productsController = require("../Controllers/products");
const isAuth = require("../middleware/isAuth");

router.get(
  "/productos",
  isAuth,
  [query("categoryId").trim().isLength({ min: 6 })],
  productsController.getProducts
);

router.get(
  "/search-productos",
  isAuth,
  [query("searchProduct").isLength({ min: 3 })],
  productsController.getSearchProduct
);

router.get(
  "/productos/:productId",
  isAuth,
  [param("productId").trim().isLength({ min: 3 })],
  productsController.getProductoById
);

module.exports = router;
