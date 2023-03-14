const Model = require("../model/subSubCategory");

const errObject = { status: false };

const Service = {};

Service.AddSubSubCategory = async (body) => {
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

module.exports = Service;
