const express = require("express");
const router = express.Router();
const SubSubCategoryService = require("../service/subSubCategory.service");
const { filterResp } = require("../helper/functions");
const verifyToken = require("../middleware/auth");

const APIService = {
  AddSubSubCategory: async (req, res) => {
    const resp = await SubSubCategoryService.AddSubSubCategory(req.body);
    res.status(resp.statusCode).json(filterResp(resp));
  },
};

router.post("/add", APIService.AddSubSubCategory);

module.exports = router;
