const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Logo = require("../model/Logo");

/**
 * @method - GET
 * @description - Get logo
 * @param - /logo
 */

router.get("/logo", async (req, res) => {
  try {
    const logo = await Logo.find({});
    res.send(...logo);
  } catch (e) {
    res.send({ message: e });
  }
});

/**
 * @method - POST
 * @param - /logo
 * @description - Update logo
 */

router.post("/logo", auth, async (req, res) => {
  try {
    await Logo.deleteMany({});
    const logo = new Logo({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description,
    });

    await logo.save();
    const savedLogo = await Logo.find({});

    res.send(...savedLogo);
  } catch (e) {
    res.send({ message: e });
  }
});

module.exports = router;
