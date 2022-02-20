const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    text: {
      required: [true, "Please add a text value"],
      type: String,
    },
  },
  {
    collection: "goals",
    timestamps: true,
  }
);

module.exports = mongoose.model("goal", Schema);
