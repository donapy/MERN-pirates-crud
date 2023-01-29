const mongoose = require("mongoose");

var pirateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      require: [true, "The field name is required"],
      minLenght: [3, "The name needs at least 3 chars"],
    },
    imgurl: {
      type: String,
      require: [true, "The field imgurl is required"],
      minLenght: [4, "The imgurl needs at least 4 chars"],
    },
    chests: {
      type: Number,
      required: true,
      require: [true, "The field chests is required"],
    },
    phrase: {
      type: String,
      require: [true, "The field phrase is required"],
      minLenght: [4, "The phrase needs at least 4 chars"],
    },
    position: {
      type: String,
      require: [true, "The field position is required"],
      enum: [
        "Captain",
        "First Mate",
        "Quarter Master",
        "Boatswain",
        "Powder Monkey",
      ],
    },
    pegleg: {
      type: Boolean,
      require: [true, "The field pegleg is required"],
    },
    eyepatch: {
      type: Boolean,
      require: [true, "The field eyepatch is required"],
    },
    hookhand: {
      type: Boolean,
      require: [true, "The field hookhand is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pirate", pirateSchema);
