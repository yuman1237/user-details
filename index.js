const express = require("express");
const app = express();
const session = require("express-session");
const router = require("./backend/routers/router");
const path = require("path");
const flash = require("connect-flash");
require("./backend/db/conn");
const port = process.env.PORT || 4000;
const template_path = path.join(__dirname, "views");
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const public_path = path.join(__dirname, "./public");
app.use(express.static(public_path));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("view engine", "hbs");
app.set("views", template_path);
app.use("/", router);

app.listen(port, () => {
  console.log("Server is listening on", port);
});

module.exports = app;
