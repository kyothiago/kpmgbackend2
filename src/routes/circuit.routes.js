const Router = require("express");
const cors = require('cors')
const multer = require('multer')
const path = require("path");

const circuitRouter = Router();

const Circuit = require("../model/Circuit");

circuitRouter.post("/add", (req, res) => {
  Circuit
    .create({
      circuitoRef: req.body.nameCircuit,
      circuitoNome: req.body.nameCircuit,
      circuitoLocalizacao: req.body.local,
      circuitoPais: req.body.country,
      circuitoUrl: req.body.urlCircuit,
      circuitoUrl: req.body.time,
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
  Circuit
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
  Circuit
    .findAll()
    .then((dados) => {
      res.json(dados);
    })
    .catch((erro) => {
      res.status(400).json({message:"ocorreu um erro", erro});
    });
});

const uuid4 = require("uuid").v4;
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: function (req, file, cb) {
    const fullName =
      "blog_" + uuid4().replace(/-/g, "") + path.extname(file.originalname);
    cb(null, fullName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // file size two milion bytes are allowed
  fileFilter: function (req, file, cb) {
    // filter file when it is needed
    const fileTypes = /png|jpeg|jpg/;
    const extName = fileTypes.test(path.extname(file.originalname));
    file.originalname.toLowerCase();
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb("Error: only png, jpeg, and jpg are allowed!");
    }
  },
});

circuitRouter.post("/circuits/upload/:id", upload.single("photo"), async (req, res) => {
  try {
    const photo = "/uploads/" + req.file.filename;
    const { id } = req.params;
    const foto = await Circuit.findOneAndUpdate({ _id: id }, { photo });
    if (foto == null) {
      fs.unlink(path.join(__dirname, photo), (err) => {
        if (err) throw err;
        else res.status(404).json({ success: false });
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
});

module.exports = circuitRouter;
