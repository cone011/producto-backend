// const { validationResult } = require("express-validator");
// const { errorHanlder } = require("../utils/errorHandler");

exports.getCurrencyById = async (currencyId) => {
  try {
    // const errors = validationResult(req);
    // errorHanlder(errors);
    // const currencyId = req.params.currencyId;
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}currencies/${currencyId}`
    );
    const jsonFormat = await result.json();
    return jsonFormat;
  } catch (err) {}
};
