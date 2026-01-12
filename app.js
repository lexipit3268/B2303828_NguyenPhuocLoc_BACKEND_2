const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const contactRouters = require("./app/routes/contact.route");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactRouters);

//handle 404 response
app.use((req, res, next) => {
  //goi next() de chuyen sang middleware xu ly loi
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  //main Middleware
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});
module.exports = app;
