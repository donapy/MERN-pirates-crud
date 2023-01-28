const mongoose = require("mongoose");

var todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    task: {
      type: String,
      require: [true, "The field task is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema);
