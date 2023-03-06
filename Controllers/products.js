const { validationResult } = require("express-validator");
const product = require("../Models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const errros = validationResult(req);
    const categoryId = req.query.categoryId;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}${process.env.SITE}/search?category=${categoryId}`
    );
    const jsonFormat = await result.json();
    // const { results } = jsonFormat;
    // let arrSave = [];
    // for (let i = 0; i < results.length; i++) {
    //   arrSave.push({
    //     productCode: results[i].id,
    //     title: results[i].title,
    //     imageUrl: results[i].thumbnail,
    //     price: results[i].price,
    //   });
    // }
    // await product.insertMany(arrSave);
    // const productObject = new product({
    //   productCode: results[0].id,
    //   title: results[0].title,
    //   imageUrl: results[0].thumbnail,
    //   price: results[0].price,
    // });
    //const resultsave = await productObject.save();
    res.status(200).json({ message: "OK", ...jsonFormat });
  } catch (err) {
    console.log(err);
  }
};

exports.getSearchProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const searchProduct = req.query.searchProduct;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}${process.env.SITE}/search?q=${searchProduct}`
    );
    const jsonFormat = await result.json();
    res.status(200).json({ message: "OK", result: jsonFormat });
  } catch (err) {
    console.log(err);
  }
};
