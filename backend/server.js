const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./configs/db");
const port = process.env.PORT || 5001;
const cookieParser = require("cookie-parser");

connectDB();

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/pirate", require("./routes/pirateRoutes"));

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
