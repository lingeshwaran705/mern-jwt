const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
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
