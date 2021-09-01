const Router = require("express");

const circuitRouter = Router();

const circuit = require("../model/Circuit");

circuitRouter.post("/add", (req, res) => {
  circuit
    .create({
      circuitoRef: req.body.referencia,
      circuitoNome: req.body.nome,
      circuitoLocalizacao: req.body.localizacao,
      circuitoPais: req.body.pais,
      circuitoUrl: req.body.url,
      circuitoFoto: req.body.foto,
    })
    .then((dados) => {
      res.status(200).send(dados);
    })
    .catch(() => {
      res.status(400).send("Ocorreu um erro");
    });
});

circuitRouter.delete("/delete/:id", (req, res) => {
  circuit
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

circuitRouter.get("/get", (req, res) => {
  circuit
    .findAll()
    .then((dados) => {
      res.json(dados);
    })
    .catch((erro) => {
      res.status(400).send("ocorreu um erro");
    });
});

circuitRouter.put("/update", (req, res) => {
  circuit
    .update(
      {
        circuitoFoto: req.body.circuitoFoto,
      },
      {
        where: {
          circuitoId: req.body.circuitoId,
        },
      }
    )
    .then(() => {
      res.status(200).send("Sucesso");
    })
    .catch(() => {
      res.status(400).send("Ocorreu um erro");
    });
});

module.exports = circuitRouter;
