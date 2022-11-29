// Include core libraries
const express = require("express");

const app = express();
app.use(express.json());
const port = 3000 || process.env.PORT;

// Include routes
const userRoutes = require("./routes/user");
const scheduleRoutes = require("./routes/schedule");

// Include config files
const status = require("./configs/status");

// Include Database files
const database = require("./database/mysql");

// environment control
const isDeveloping = process.env.NODE_ENV === "development";

//include middleware
const middleware = require("./middleware/auths");
const schedule = require("./controllers/schedule");

// Make DB connections
const dbSelfCheck = async () => {
  let dbSelfCheckQuery = database.knex.select(database.knex.raw("now()"));

  try {
    let result = await dbSelfCheckQuery;
    console.log("SQL-DATABASE is up and running");
  } catch (e) {
    console.log("MySQL connection error", e);
  }
};
dbSelfCheck();

// Healthcheck routes
app.get("/ping", (req, res) => {
  res.send("pong");
});

// middlware
app.use(middleware);

// // Routes
app.use("/user", userRoutes);
app.use("/schedule", scheduleRoutes);

// Catch 404s
app.use((req, res, next) => {
  res.statusCode = 404;
  res.json(status.getStatus("url_missing"));
});

// Global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(new Date().toISOString(), err);
  }

  if (err.hasOwnProperty("error")) {
    res.json(err);
  } else {
    let err = status.getStatus("generic_fail");
    res.json(err);
  }
});

app.listen(port, () => {
  console.log(`########## Environment: ${process.env.NODE_ENV} ##########`);
  console.log(`${new Date()}`);
  console.log(`Server running on port:${port}`);
});
