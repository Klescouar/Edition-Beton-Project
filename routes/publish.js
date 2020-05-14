const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const auth = require("../middleware/auth");
const { cleanBuild, buildFront } = require("../utils/build-front");

/**
 * @method - POST
 * @param - /publish
 * @description - Build front
 */

router.post("/publish", auth, async (req, res) => {
  try {
    await cleanBuild;
    buildFront();
    res.send({ message: "build OK" });
  } catch (e) {
    res.send({ message: e });
  }
});

router.get("/build", async (req, res) => {
  fs.access(path.join(__dirname, "../static-site/public/index.html"), (err) => {
    if (err) {
      res.send({ ready: false });
    } else {
      res.send({ ready: true });
    }
  });
});

module.exports = router;
