const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;