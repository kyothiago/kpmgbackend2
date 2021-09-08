const Router = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const verifyJWT = require("../middlewares/jwtmidle");
const circuitRouter = Router();

const Circuit = require("../model/Circuit");

circuitRouter.delete("/delete/:id", verifyJWT, async (req, res) => {
  Circuit.destroy({
    where: { circuitoId: req.params.id },
  })
    .then((dados) => {
      res.status(200).send(dados.toString());
    })
    .catch((error) => {
      res.status(400).json({ message: "Ocorreu um erro", error });
    });
});


circuitRouter.get("/get", verifyJWT, async (req, res) => {
  await Circuit.findAll()
    .then((dados) => {
      res.json(dados);
    })
    .catch((erro) => {
      res.status(400).json({ message: "ocorreu um erro", erro });
    });
});

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: function (req, file, cb) {
    const fullName =
      "photo" + uuidv4().replace(/-/g, "") + path.extname(file.originalname);
    cb(null, fullName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    //checar a extensão do arquivo original se é igual a determinada no fileTypes (tipos de arquivos)
    const fileTypes = /png|PNG|jpeg|JPEG|jpg|JPG/;
    const extName = fileTypes.test(path.extname(file.originalname));
    file.originalname.toLowerCase();
    //checa se o tamanho do arquivo em bytes é maior do que o limite
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Erro, apenas arquivos jpeg, jpg e png podem ser enviados"));
    }
  },
});

circuitRouter.post(
  "/upload/:id", verifyJWT,
  multer(upload).single("photo"),
  async (req, res, next) => {
    console.log(req.file);
    try {
      const photo = "public/uploads/" + req.file.filename;
      const id = req.params.id;
      const foto = await Circuit.update(
        { 
          circuitoNome: req.body.nameCircuit,
          circuitoFoto: photo,
          circuitoUrl:  req.body.urlCircuit
        },
        {
          where:{
            circuitoId: id
          }
        }
      );
      if (foto == null) {
        fs.unlink(path.join(__dirname, photo), (err) => {
          if (err) throw err;
          else res.status(404).json({ success: false, err });
        });
        return;
      }
      res.json({
        success: true,
        foto,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        err,
      });
    }
  }
);

circuitRouter.post("/add", verifyJWT, upload.single("photo"), async (req, res, next) => {
  const photo = "public/uploads/" + req.file.filename
  await Circuit.create({
    circuitoRef: req.body.nameCircuit,
    circuitoNome: req.body.nameCircuit,
    circuitoLocalizacao: req.body.local,
    circuitoPais: req.body.country,
    circuitoUrl: req.body.urlCircuit,
    circuitoFoto: photo,
  })
    .then((dados) => {
      console.log("deu certo");
      res.status(200).send(dados);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Ocorreu um erro");
    });
});

circuitRouter.get("/:id", verifyJWT,async (req, res) => {
  let id = req.params.id;
  await Circuit.findOne({ where: { circuitoId: id } })
    .then((data) => {
      res.json(data);
    })
    .catch((erro) => {
      res.status(400).json({ message: "ocorreu um erro", erro });
    });
});

module.exports = circuitRouter;
