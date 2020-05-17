const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const About = require("../model/About");

/**
 * @method - GET
 * @description - Get about content
 * @param - /about
 */

router.get("/about", async (req, res) => {
  try {
    const about = await About.find({});
    res.send(...about);
  } catch (e) {
    res.send({ message: e });
  }
});

/**
 * @method - POST
 * @param - /about
 * @description - Update About
 */

router.post("/about", auth, async (req, res) => {
  try {
    await About.deleteMany({});
    const about = new About({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description,
      aboveImage: req.body.aboveImage,
      bottomImage: req.body.bottomImage,
    });

    await about.save();
    const savedAbout = await About.find({});

    res.send(...savedAbout);
  } catch (e) {
    res.send({ message: e });
  }
});

module.exports = router;
