const Router = require("express");

const userRouter = Router();

const user = require("../model/User");

userRouter.post("/add", (req, res) => {
  user
    .create({
      usuarioLogin: req.body.login,
      usuarioNome: req.body.nome,
      usuarioEmail: req.body.email,
      usuarioSenha: req.body.password,
      usuarioCelular: req.body.celular,
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
        usuarioNome: req.body.nome,
        usuarioEmail: req.body.email,
        usuarioSenha: req.body.password,
        usuarioCelular: req.body.celular,
      },
      {
        where: {
          circuitoId: req.body.circuitoId,
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
