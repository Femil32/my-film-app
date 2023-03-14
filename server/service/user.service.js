const jwt = require("jsonwebtoken");
const Model = require("../model/user");
const Config = require("../config");

const errObject = { status: false };

const Service = {};

Service.Register = async (body) => {
  try {
    let user = await Model.findOne({ email: body.email });
    if (user) {
      return {
        status: false,
        statusCode: 500,
        message: "Email Address is Already Registered",
      };
    } else {
      const user = new Model(body);
      const data = await user.save();
      return {
        status: true,
        statusCode: 200,
        data,
      };
    }
  } catch (err) {
    if (err.isJoi === true) {
      errObject.statusCode = 500;
      errObject.err = err.message;
      return errObject;
    }
  }
};

Service.Login = async (body) => {
  try {
    let user = await Model.find({
      email: body.email,
      password: body.password,
    });
    if (user <= 0) {
      return {
        status: false,
        statusCode: 500,
        message: "Incorrect email or password",
      };
    } else {
      const token = jwt.sign({ id: user[0].id }, Config.JWT_TOKEN_KEY, {
        expiresIn: "24h",
      });
      user.token = token;

      return {
        status: true,
        statusCode: 200,
        message: "You Have Successfully Logged",
        email: user[0].email,
        token: token,
      };
    }
  } catch (err) {
    errObject.statusCode = 500;
    errObject.err = err.message;
    return errObject;
  }
};

Service.GetUser = async (req) => {
  try {
    const user = await Model.findById(req.decoded.id);
    return {
      status: true,
      statusCode: 200,
      data: user,
    };
  } catch (err) {
    errObject.statusCode = 500;
    errObject.err = err.message;
    return errObject;
  }
};

Service.UpdateUser = async (req) => {
  try {
    const options = { new: true };
    const user = await Model.findById(req.decoded.id);
    const updateData = await Model.findByIdAndUpdate(
      user._id,
      req.body,
      options
    );
    return {
      status: true,
      statusCode: 200,
      message: "Update Data Successfully",
      data: updateData,
    };
  } catch (err) {
    errObject.statusCode = 500;
    errObject.err = err.message;
    return errObject;
  }
};

module.exports = Service;
