const Router = require("express");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const bcrypt = require("bcryptjs");
const user = require("../model/User");
const verifyJWT = require("../middlewares/jwtmidle");
const secret = "authformulaone";
const refreshsecret = "authrefresh"
const tokenList = {};

userRouter.post("/add", async (req, res) => {

  let login = req.body.login;
  const userFinded = await user.findOne({ where: { usuarioLogin: login } })
  if(!userFinded){
  let password = req.body.password;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  user
    .create({
      usuarioLogin: req.body.login,
      usuarioNome: req.body.name,
      usuarioEmail: req.body.email,
      usuarioSenha: hash,
      usuarioCelular: req.body.celular,
    })

    .then((dados) => {
      res.status(200).send(dados);
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Ocorreu um erro na criação do usuário", error });
    });
}else{
  return console.log("Usuário já cadastrado");
}
})

userRouter.put("/:id",verifyJWT, async (req, res) => {
  let password = req.body.password;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  await user
    .update(
      {
        usuarioLogin: req.body.login,
        usuarioNome: req.body.name,
        usuarioEmail: req.body.email,
        usuarioSenha: hash,
        usuarioCelular: req.body.celular,
      },
      {
        where: {
          usuarioId: req.params.id,
        },
      }
    )
    .then((dados) => {
      res.status(200).send(dados);
    })
    .catch(() => {
      res.status(400).send("Ocorreu um erro");
    });
});

userRouter.delete("/delete/:id", verifyJWT, (req, res) => {
  user
    .destroy({
      where: { id: req.params.id },
    })
    .then((dados) => {
      res.status(200).send(dados);
    })
    .catch(() => {
      res.status(400).send("Ocorreu um erro");
    });
});

userRouter.post("/authenticate", async (req, res) => {
  let login = req.body.login;
  let password = req.body.password;

  const userFinded = await user.findOne({ where: { usuarioLogin: login } });

  let correct = bcrypt.compareSync(
    password,
    userFinded.dataValues.usuarioSenha
  );

  if (!correct) {
    res.status(401).json({ message: "Usuário não autorizado!" });
  }
  const token = jwt.sign(
    {
      data: userFinded.dataValues.usuarioId,
    },
    secret,
    { expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    {
      data: userFinded.dataValues.usuarioId
    },
    refreshsecret,
   { expiresIn: "1m"}
  );
  const response = {
    "status": "Logged in",
    "id": userFinded.dataValues.usuarioId,
    "token": token,
    "refreshToken": refreshToken,
}
  tokenList[refreshToken] = response
    res.status(200).json(response);
});

userRouter.get("/:id", verifyJWT, async (req, res) => {
  let id = req.params.id;
  await user.findOne({ where: { usuarioId: id } })
    .then((data) => {
      res.json(data);
    })
    .catch((erro) => {
      res.status(400).json({ message: "ocorreu um erro", erro });
    });
});

userRouter.use(require('../middlewares/jwtmidle'))
module.exports = userRouter;