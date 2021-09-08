const Router = require("express");
const refreshJWT = require("./middlewares/auth");

const circuitRouter = require("./routes/circuit.routes");
const userRouter = require("./routes/user.routes");

const routes = Router();

routes.use("/user", userRouter);
routes.use("/circuit", circuitRouter);

const res = routes.post("/auth",  refreshJWT /* async (res, req) => {
    return await 
} */);

module.exports = routes; 


