const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    subSubCategoryId: { type: Number },
    subSubCategoryName: { required: true, type: String },
    subCategoryId: { type: Number },
    subCategoryName: { required: true, type: String },
    categoryId: { type: Number },
    categoryName: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },
    permalink: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    perlinkCat1: {
      type: String,
    },
    perlinkCat2: {
      type: String,
    },
    perlinkCat3: {
      type: String,
    },
    banImg: {
      type: String,
    },
    catImg: { type: String },
    type: { type: String },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("SubSubCategories", dataSchema);
