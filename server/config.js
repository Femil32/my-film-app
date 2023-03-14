require("dotenv").config;

const Config = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/my-film-app",
  PORT: process.env.PORT || "8080",
  JWT_TOKEN_KEY:
    process.env.JWT_TOKEN_KEY || "hackvengerseventinparuluniversity",
  BASE_URL: process.env.BASE_URL || "http://localhost:8080/",
};

module.exports = Config;
