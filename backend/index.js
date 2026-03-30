const express = require("express");
const app = express();
const mongoose = require("mongoose");
const signup = require("./routes/signup.route");
const login = require("./routes/login.route");
const school = require("./routes/school.route");
const assignment = require("./routes/assignment.route");
const user = require("./routes/user.route");

mongoose
  .connect("mongodb://localhost/gradebook")
  .then(() => console.log(`Connected to mongodb`))
  .catch((err) => console.error(`Could not connect to mongodb:`, err.message));

app.use(express.json());

app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/schools", school);
app.use("/api/assignments", assignment);
app.use("/api/users", user);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
