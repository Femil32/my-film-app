const Helpers = {
  sendSuccess: (res, message, data = {}) => {
    return res.status(200).json({
      success: true,
      message,
      data: data,
    });
  },
  sendError: (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  },
};
const filterResp = (obj) => {
  const { statusCode, ...resp } = obj;
  return resp;
};

module.exports = {
  Helpers,
  filterResp,
};
