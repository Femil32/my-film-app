const Model = require("../model/category");

const errObject = { status: false };

const Service = {};

Service.AddCategory = async (body) => {
  try {
    const user = new Model(body);
    const data = await user.save();
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
Service.FetchCategory = async () => {
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
