const CustomError = require("../../helpers/error/CustomError");
const customErrorHandlers = (err, req, res, next) => {
  let customError = err;

  // console.log(err.name);
  if (err.name == "SyntaxError") {
    customError = new CustomError("unexpected syntax", 400);
  }
  if ((err.name = "ValidationError")) {
    customError = new CustomError(err.message, 400);
  }
  if (err.name === "CastError") {
    customError = new CustomError("Please provide a valid id", 400);
  }
  if (err.code === 11000) {
    // dublicate error
    customError = new CustomError(
      "Dublicate key found :Please check your input",
      400
    );
  }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message,
    stack:
      process.env.NODE_ENV === "development" ? customError.stack : undefined,
  });
};

module.exports = customErrorHandlers;
