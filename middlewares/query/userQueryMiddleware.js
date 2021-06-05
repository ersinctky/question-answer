const asyncErrorWraapper = require("express-async-handler");
const { searchHelper, paginationHelper } = require("./queryMiddlewaresHelper");

const userQueryMiddleware = function (model, options) {
  return asyncErrorWraapper(async function (req, res, next) {
    let query = model.find();

    // search by name

    query = searchHelper("name", query, req);

    const paginationResult = await paginationHelper(model, query, req);
    query = paginationResult.query;
    pagination = paginationResult.pagination;
    const queryResults = await query.find();
    res.queryResults = {
      success: true,
      count: queryResults.length,
      pagination,
      data: queryResults,
    };
    next();
  });
};

module.exports = userQueryMiddleware;
