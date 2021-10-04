const express = require("express"),
  router = express.Router(),
  authRouter = require("./auth.routes"),
  taskRouter = require("./task.routes");

router.use("/auth", authRouter);

router.use("/task", taskRouter);

module.exports = router;
