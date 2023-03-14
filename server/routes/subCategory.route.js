const express = require("express");
const router = express.Router();
const SubCategoryService = require("../service/subCategory.service");
const { filterResp } = require("../helper/functions");
const verifyToken = require("../middleware/auth");

const APIService = {
  AddSubCategory: async (req, res) => {
    const resp = await SubCategoryService.AddSubCategory(req.body);
    res.status(resp.statusCode).json(filterResp(resp));
  },
  FetchSubCategory: async (req, res) => {
    const resp = await SubCategoryService.FetchSubCategory(req.body);
    res.status(resp.statusCode).json(filterResp(resp));
  },
};

router
  .post("/add", verifyToken, APIService.AddSubCategory)
  .get("/fetch", verifyToken, APIService.FetchSubCategory);

module.exports = router;
