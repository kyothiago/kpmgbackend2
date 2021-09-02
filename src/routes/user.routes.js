const Router = require("express");
const crypto = require('crypto');
const userRouter = Router();

const user = require("../model/User");

function gerarSalt() {
  return crypto.randomBytes(16).toString('hex');
};


function sha512(password) {
  var hash = crypto.createHash('sha512');
  hash.update(password);
  var hash = hash.digest('hex');
  return hash
};

function gerarSenha(password) {
  let salt = gerarSalt(16);
  let senhaESalt = sha512(password, salt);
  return senhaESalt;
}

userRouter.post("/add", (req, res) => {
  user
    .create({
      usuarioLogin: req.body.login,
      usuarioNome: req.body.name,
      usuarioEmail: req.body.email,
      usuarioSenha: gerarSenha(req.body.password),
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
