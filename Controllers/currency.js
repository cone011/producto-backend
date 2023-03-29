exports.getCurrencyById = async (currencyId) => {
  try {
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}currencies/${currencyId}`
    );
    const jsonFormat = await result.json();
    return jsonFormat;
  } catch (err) {
    throw new Error(err);
  }
};
