const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5001;
const { corsOptions } = require("./config/corsOptions");
const connectDB = require("./config/db");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.use("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.use(require("./middlewares/error.middleware"));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
