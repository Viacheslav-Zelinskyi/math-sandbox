const express = require("express");
require("dotenv").config();
const http = require("http");
const path = require("path");
const ws = require("ws");
const db = require("./db");

const port = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);
const wss = new ws.Server({ server: httpServer });

httpServer.listen(port);

app.use("/", express.static(path.join(__dirname, "client/build")));

app.get(["/", "/mainpage", "/userpage", "/taskpage"], (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "client/build") });
});

app.get("/dbtest", (req, res) => {
  
  res.send("Test");
});
