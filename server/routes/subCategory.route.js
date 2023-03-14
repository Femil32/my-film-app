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
};

router.post("/add", APIService.AddSubCategory);

module.exports = router;
