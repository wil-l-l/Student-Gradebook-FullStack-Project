const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/gradebook")
  .then(() => console.log(`Connected to mongodb`))
  .catch((err) => console.error(`Could not connect to mongodb:`, err.message));

require("./startup/routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
