const express = require("express");
require("dotenv").config();
const routes = require("./routes");
const http = require("http");
const path = require("path");
const ws = require("ws");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const port = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);
const wss = new ws.Server({ server: httpServer });

httpServer.listen(port);

app.use("/", express.static(path.join(__dirname, "client/build")));

app.get(["/", "/mainpage", "/userpage", "/taskpage"], (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "client/build") });
});

app.use("/api", jsonParser, routes);
