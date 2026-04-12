const express = require("express");
const signup = require("../routes/signup.route");
const login = require("../routes/login.route");
const school = require("../routes/school.route");
const assignment = require("../routes/assignment.route");
const user = require("../routes/user.route");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/signup", signup);
  app.use("/api/login", login);
  app.use("/api/schools", school);
  app.use("/api/assignments", assignment);
  app.use("/api/users", user);
};
