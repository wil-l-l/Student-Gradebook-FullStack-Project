const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

process.on("uncaughtException", (err) => {
  console.error("Caught an uncaught exception: ", ex);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Caught an unhandled rejection: ", reason);
  process.exit(1);
});

if (!config.get("db")) {
  console.error("Could not start app: db is not defined");
  process.exit(1);
}

mongoose
  .connect(config.get("db"))
  .then(() => console.log(`Connected to mongodb`))
  .catch((err) => console.error(`Could not connect to mongodb:`, err.message));

app.use(cors());
require("./startup/production")(app);
require("./startup/routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
