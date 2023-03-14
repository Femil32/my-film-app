const express = require("express");
const router = express.Router();
const CategoryService = require("../service/category.service");
const { filterResp } = require("../helper/functions");
const verifyToken = require("../middleware/auth");

const APIService = {
  AddDashboard: async (req, res) => {
    const resp = await CategoryService.AddDashboard(req.body);
    res.status(resp.statusCode).json(filterResp(resp));
  },
  FetchDashboard: async (req, res) => {
    const resp = await CategoryService.FetchDashboard();
    res.status(resp.statusCode).json(filterResp(resp));
  },
};

router
  .post("/add", APIService.AddDashboard)
  .get("/fetch", APIService.FetchDashboard);

module.exports = router;
