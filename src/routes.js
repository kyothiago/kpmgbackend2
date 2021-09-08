const Router = require("express");
const refreshJWT = require("./middlewares/auth");

const circuitRouter = require("./routes/circuit.routes");
const userRouter = require("./routes/user.routes");

const routes = Router();

routes.use("/user", userRouter);
routes.use("/circuit", circuitRouter);

routes.post("/auth",  refreshJWT, (req, res) =>{
    res.sendStatus(200);
});

module.exports = routes;


