const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// export model article with AboutSchema
module.exports = mongoose.model("about", AboutSchema);
