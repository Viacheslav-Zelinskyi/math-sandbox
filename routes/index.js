const express = require("express"),
  router = express.Router(),
  authRouter = require("./auth.routes"),
  taskRouter = require("./task.routes"),
  userRouter = require("./user.routes");

router.use("/auth", authRouter);

router.use("/task", taskRouter);

router.use("/user", userRouter);

module.exports = router;
