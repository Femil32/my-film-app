const express = require("express");
const router = express.Router();
const CategoryService = require("../service/category.service");
const { filterResp } = require("../helper/functions");
const verifyToken = require("../middleware/auth");

const APIService = {
  AddCategory: async (req, res) => {
    const resp = await CategoryService.AddCategory(req.body);
    res.status(resp.statusCode).json(filterResp(resp));
  },
};

router.post("/add", APIService.AddCategory);

module.exports = router;
