const { validationResult } = require("express-validator");
const { getUserSeller } = require("./user");
const { getCurrencyById } = require("../Controllers/currency");
const contactLastName = require("../utils/functionAux");
const getCategoriesValues = require("../utils/functionAux");

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
    let { values } = getCategoriesValues(jsonFormat.available_filters);
    const categories = values.map((item) => {
      return item.name;
    });
    const newFormat = reformProductData(jsonFormat.results, currencyData);
    const sendNewFormat = { categories: categories, ...newFormat };
    console.log(sendNewFormat);
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
    const productId = req.params.productId;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}items/${productId}`
    );
    const dataJson = await result.json();
    const author = await getUserSeller(dataJson.seller_id);
    const valueReturn = {
      author: { ...author },
      item: {
        id: dataJson.id,
        title: dataJson.title,
        price: dataJson.price,
        currency: dataJson.currency_id,
        amount: dataJson.price,
      },
      picture: dataJson.pictures[0].url,
      condition: dataJson.condition,
      free_shipping: dataJson.shipping.free_shipping,
      sold_quantity: dataJson.sold_quantity,
      description: dataJson.title,
    };
    res.status(200).json({ message: "OK", ...valueReturn });
  } catch (err) {
    next(err);
  }
};

function reformProductData(arrPass, currencyData) {
  let arrReturn = [];
  async function recursiveWay(arr) {
    if (arr.length <= 0) return;
    let currentValue = arr[0];
    let nameAuthor = currentValue.seller.nickname;
    let breakpoint = /\W|_/g;
    let format = nameAuthor.split(breakpoint);
    let lastname = contactLastName(format.slice(1));
    arrReturn.push({
      id: currentValue.id,
      title: currentValue.title,
      price: {
        currency: currencyData.description,
        amount: currentValue.installments.amount,
        decimals: currencyData.decimal_places,
      },
      author: {
        name: format[0],
        lastname: lastname,
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
