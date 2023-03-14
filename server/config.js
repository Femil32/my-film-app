require("dotenv").config;

const Config = {
  MONGO_URL:
    process.env.MONGO_URL ||
    "mongodb+srv://vrushabhvasoya16:admin@cluster0.fmktbcm.mongodb.net/my-film-app?retryWrites=true&w=majority",
  PORT: process.env.PORT || "8080",
  JWT_TOKEN_KEY:
    process.env.JWT_TOKEN_KEY || "hackvengerseventinparuluniversity",
  BASE_URL: process.env.BASE_URL || "http://localhost:8080/",
};

module.exports = Config;
