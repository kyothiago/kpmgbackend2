const Router = require("express");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const bcrypt = require("bcryptjs");
const user = require("../model/User");
const secret = "authformulaone";

userRouter.post("/add", (req, res) => {
  let password = req.body.password;
  let email = req.body.email;

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
});

userRouter.put("/:id", (req, res) => {
  user
    .update(
      {
        usuarioLogin: req.body.login,
        usuarioNome: req.body.name,
        usuarioEmail: req.body.email,
        usuarioSenha: req.body.password,
        usuarioCelular: req.body.celular,
      },
      {
        where: {
          usuarioId: req.body.usuarioId,
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

userRouter.delete("/delete/:id", (req, res) => {
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
    { expiresIn: "1h" }
  );

  res.status(200).json({ token: token });
});
module.exports = userRouter;
