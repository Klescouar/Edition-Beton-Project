const express = require("express");
const router = express.Router();

const Category = require("../model/Category");

/**
 * @method - GET
 * @description - Get all categories
 * @param - /categories
 */

router.get("/categories", async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res.send(allCategories);
  } catch (e) {
    res.send({ message: e });
  }
});

/**
 * @method - POST
 * @param - /category
 * @description - Add Category
 */

router.post("/category", async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });

    await category.save();
    const allCategories = await Category.find({});
    res.send(allCategories);
  } catch (e) {
    res.send({ message: e });
  }
});

/**
 * @method - DELETE
 * @description - Remove a category
 * @param - /category
 */

router.delete("/category", async (req, res) => {
  try {
    await Category.findOneAndRemove({
      _id: req.body.id,
    });
    const allCategories = await Category.find({});
    res.send(allCategories);
  } catch (e) {
    res.send({ message: e });
  }
});

module.exports = router;
