const { validationResult } = require("express-validator");
const { getCurrencyById } = require("./currency");

exports.getProducts = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const categoryId = req.query.categoryId;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}${process.env.SITE}/search?category=${categoryId}`
    );
    const jsonFormat = await result.json();
    const currencyData = await getCurrencyById(process.env.CURRENT_COUNTRY);
    const newFormat = reformProductData(jsonFormat.results, currencyData);
    res.status(200).json({ message: "OK", ...jsonFormat });
  } catch (err) {
    next(err);
  }
};

exports.getSearchProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const searchProduct = req.query.searchProduct;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}${process.env.SITE}/search?q=${searchProduct}`
    );
    const jsonFormat = await result.json();
    res.status(200).json({ message: "OK", result: jsonFormat });
  } catch (err) {
    next(err);
  }
};

exports.getProductoById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    errorHanlder(errors);
    const productId = req.params.productId;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}items/${productId}`
    );
    const dataJson = await result.json();
    res.status(200).json({ message: "OK", ...dataJson });
  } catch (err) {
    next(err);
  }
};

function reformProductData(arrPass, currencyData) {
  let arrReturn = [];
  async function recursiveWay(arr) {
    if (arr.length <= 0) return;
    let currentValue = arr[0];
    arrReturn.push({
      id: currentValue.id,
      title: currentValue.title,
      price: {
        currency: currencyData.description,
        amount: currentValue.installments.amount,
        decimals: currencyData.decimal_places,
      },
      picture: currentValue.thumbnail,
      condition: currentValue.condition,
      free_shipping: currentValue.shipping.free_shipping,
      sell_price: currentValue.price,
    });
    return recursiveWay(arr.slice(1));
  }
  recursiveWay(arrPass);
  return arrReturn;
}
