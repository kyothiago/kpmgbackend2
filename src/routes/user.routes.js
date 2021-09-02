const Router = require("express");
//const crypto = require('crypto');
const userRouter = Router();
const bcrypt = require('bcryptjs');

const user = require("../model/User");

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
      usuarioCelular: req.body.celular
    })
    .then((dados) => {
      res.status(200).send(dados);
    })
    .catch(() => {
      res.status(400).send("Ocorreu um erro");
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

module.exports = userRouter;
