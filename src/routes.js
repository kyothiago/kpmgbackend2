const Router = require("express");

const circuitRouter = require("./routes/circuit.routes");
const userRouter = require("./routes/user.routes");

const routes = Router();

routes.use("/user", userRouter);
routes.use("/circuit", circuitRouter);

module.exports = routes;
