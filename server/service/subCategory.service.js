const Model = require("../model/subCategory");

const errObject = { status: false };

const Service = {};

Service.AddSubCategory = async (body) => {
  try {
    const options = { ordered: true };

    const body = await Model.insertMany(data, options);
    return {
      status: true,
      statusCode: 200,
      body,
    };
  } catch (err) {
    errObject.statusCode = 500;
    errObject.err = err.message;
    return errObject;
  }
};

Service.FetchSubCategory = async () => {
  try {
    const data = await Model.find({});
    return {
      status: true,
      statusCode: 200,
      data,
    };
  } catch (err) {
    errObject.statusCode = 500;
    errObject.err = err.message;
    return errObject;
  }
};
module.exports = Service;
