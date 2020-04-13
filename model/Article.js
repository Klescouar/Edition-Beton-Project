const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// export model article with ArticleSchema
module.exports = mongoose.model("article", ArticleSchema);
