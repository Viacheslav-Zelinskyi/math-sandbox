const express = require("express");
const http = require("http");
const path = require("path");
const ws = require("ws");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);
const wss = new ws.Server({ server: httpServer });

httpServer.listen(port);

app.use("/", express.static(path.join(__dirname, "client/build")));

app.get(["/", "/mainpage", "/userpage", "/taskpage"], (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "client/build") });
});
