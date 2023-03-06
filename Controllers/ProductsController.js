const { validationResult } = require("express-validator");

exports.getProducts = async (req, res, next) => {
  try {
    const errros = validationResult(req);
    const categoryId = req.query.categoryId;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}${process.env.SITE}/search?category=${categoryId}`
    );
    const jsonFormat = await result.json();
    res.status(200).json({ message: "OK", result: jsonFormat });
  } catch (err) {
    console.log(err);
  }
};

exports.getSearchProduct = async (req, res, next) => {
  try {
    console.log("entro aca search");
    const errors = validationResult(req);
    const searchProduct = req.query.searchProduct;
    console.log(searchProduct);
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}${process.env.SITE}/search?q=${searchProduct}`
    );
    const jsonFormat = await result.json();
    res.status(200).json({ message: "OK", result: jsonFormat });
  } catch (err) {
    console.log(err);
  }
};
