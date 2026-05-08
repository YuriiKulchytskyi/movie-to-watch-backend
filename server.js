const app = require("express")();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRouter = require("./routes/api/auth");

app.use(express.json());
app.use(cors());

const { DB_HOST } = process.env;
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Non Found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error!" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  // .then(() => {
  //   console.log("DB is connected");
  //   app.listen(3000, () => {
  //     console.log("Server is running on post 3000!");
  //   });
  // })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });


  module.exports = app;
  