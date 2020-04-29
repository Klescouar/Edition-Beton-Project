const express = require("express");
const router = express.Router();
const Formidable = require("formidable");
const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const path = require("path");
const auth = require("../middleware/auth");
const Article = require("../model/Article");

// Returns true if successful or false otherwise
async function checkCreateUploadsFolder(uploadsFolder) {
  try {
    await fs.statAsync(uploadsFolder);
  } catch (e) {
    if (e && e.code == "ENOENT") {
      console.log("The uploads folder doesn't exist, creating a new one...");
      try {
        await fs.mkdirAsync(uploadsFolder);
      } catch (err) {
        console.log("Error creating the uploads folder 1");
        return false;
      }
    } else {
      console.log("Error creating the uploads folder 2");
      return false;
    }
  }
  return true;
}

// Returns true or false depending on whether the file is an accepted type
function checkAcceptedExtensions(file) {
  const type = file.type.split("/").pop();
  const accepted = ["jpeg", "jpg", "png", "gif"];
  if (accepted.indexOf(type) == -1) {
    return false;
  }
  return true;
}

/**
 * @method - POST
 * @param - /upload
 * @description - Upload Image
 */

router.post("/upload", auth, async (req, res) => {
  let form = Formidable.IncomingForm();
  const uploadsFolder = path.join(__dirname, "../medias");
  form.multiples = true;
  form.uploadDir = uploadsFolder;
  form.maxFileSize = 50 * 1024 * 1024; // 50 MB
  const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder);
  if (!folderCreationResult) {
    return res.status(400).json({
      message: "The uploads folder couldn't be created",
    });
  }
  form.parse(req, async (err, fields, files) => {
    let myUploadedFiles = [];
    if (err) {
      console.log("Error parsing the incoming form");
      return res.status(400).json({
        message: "Error passing the incoming form",
      });
    }
    // If we are sending only one file:
    if (!files.files.length) {
      const file = files.files;
      if (!checkAcceptedExtensions(file)) {
        console.log("The received file is not a valid type");
        return res.status(400).json({
          message: "The sent file is not a valid type",
        });
      }
      const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, "-"));
      myUploadedFiles.push(fileName);
      try {
        await fs.renameAsync(file.path, path.join(uploadsFolder, fileName));
      } catch (e) {
        console.log("Error uploading the file");
        try {
          await fs.unlinkAsync(file.path);
        } catch (e) {}
        return res.status(400).json({ message: "Error uploading the file" });
      }
    } else {
      for (let i = 0; i < files.files.length; i++) {
        const file = files.files[i];
        if (!checkAcceptedExtensions(file)) {
          console.log("The received file is not a valid type");
          return res.status(400).json({
            message: "The sent file is not a valid type",
          });
        }
        const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, "-"));
        myUploadedFiles.push(fileName);
        try {
          await fs.renameAsync(file.path, path.join(uploadsFolder, fileName));
        } catch (e) {
          console.log("Error uploading the file");
          try {
            await fs.unlinkAsync(file.path);
          } catch (e) {}
          return res.status(400).json({ message: "Error uploading the file" });
        }
      }
    }

    res.json({
      ok: true,
      message: "File uploaded !",
      files: myUploadedFiles[0],
    });
  });
});

/**
 * @method - POST
 * @description - Add article
 * @param - /
 */

router.post("/article", auth, async (req, res) => {
  try {
    const article = new Article({
      url: req.body.url,
      title: req.body.title,
      categories: req.body.categories,
      creationDate: new Date(),
    });

    await article.save();
    const allArticles = await Article.find({});
    res.send(allArticles);
  } catch (e) {
    console.log(e);
    res.send({ message: "Erreur" });
  }
});

/**
 * @method - GET
 * @description - Get all articles
 * @param - /articles
 */

router.get("/articles", async (req, res) => {
  try {
    const allArticles = await Article.find({});
    res.send(allArticles);
  } catch (e) {
    res.send({ message: "Erreur" });
  }
});

/**
 * @method - DELETE
 * @description - Remove an article
 * @param - /article
 */

router.delete("/article", auth, async (req, res) => {
  try {
    await Article.findOneAndRemove(
      {
        _id: req.body._id,
      },
      { useFindAndModify: false }
    );
    fs.unlinkSync(`${path.join(__dirname, "../medias")}/${req.body.url}`);

    const allArticles = await Article.find({});
    res.send(allArticles);
  } catch (e) {
    console.log(e);
    res.send({ message: "Erreur" });
  }
});

/**
 * @method - PUT
 * @description - Update an article
 * @param - /article
 */

router.put("/article", auth, async (req, res) => {
  try {
    const article = new Article({
      _id: req.body._id,
      url: req.body.url,
      title: req.body.title,
      categories: req.body.categories,
    });
    await Article.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      article,
      { upsert: true, useFindAndModify: false }
    );
    const allArticles = await Article.find({});
    res.send(allArticles);
  } catch (e) {
    console.log(e);
    res.send({ message: "Erreur" });
  }
});

module.exports = router;
