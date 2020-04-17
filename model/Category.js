const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// export model article with CategorySchema
module.exports = mongoose.model("category", CategorySchema);
