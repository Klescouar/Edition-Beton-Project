const mongoose = require("mongoose");

const LogoSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

// export model article with LogoSchema
module.exports = mongoose.model("logo", LogoSchema);
