const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    //id
    fullname: {
      type: String,
      require: [true, "The field name is required"],
      minLenght: [3, "The name needs at least 3 chars"],
    },
    email: {
      type: String,
      require: [true, "The field email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "The field email is not valid",
      ],
    },
    password: {
      type: String,
      require: [true, "The field password is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
