exports.errorHanlder = (err) => {
  if (!err.isEmpty()) {
    console.log(err);
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.message = "Error al ingresar un dato";
    throw error;
  }
};
