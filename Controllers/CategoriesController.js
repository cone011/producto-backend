const { validationResult } = require("express-validator");

exports.getAllCategories = async (req, res, next) => {
  try {
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}/sites/MLA/categories`
    );
    const jsonFormat = await result.json();
    res.status(200).json({ message: "OK", result: jsonFormat });
  } catch (err) {
    console.log(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const categoryId = req.params.categoryId;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}/categories/${categoryId}`
    );
    const jsonFormat = await result.json();
    res.status(200).json({ message: "OK", result: jsonFormat });
  } catch (err) {
    console.log(err);
  }
};
