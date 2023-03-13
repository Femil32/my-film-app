const express = require("express");
const router = express.Router();
const UserService = require("../service/user.service");
const { filterResp } = require("../helper/functions");
const verifyToken = require("../middleware/auth");

const APIService = {
  Register: async (req, res) => {
    const resp = await UserService.Register(req.body);
    res.status(resp.statusCode).json(filterResp(resp));
  },
  Login: async (req, res) => {
    const resp = await UserService.Login(req.body);
    res.status(resp.statusCode).json(filterResp(resp));
  },
  GetUser: async (req, res) => {
    const resp = await UserService.GetUser(req);
    res.status(resp.statusCode).json(filterResp(resp));
  },
  UpdateUser: async (req, res) => {
    const resp = await UserService.UpdateUser(req);
    res.status(resp.statusCode).json(filterResp(resp));
  },
};

router
  .post("/register", APIService.Register)
  .post("/login", APIService.Login)
  .get("/getuser", verifyToken, APIService.GetUser)
  .put("/updateuser", verifyToken, APIService.UpdateUser);

module.exports = router;
