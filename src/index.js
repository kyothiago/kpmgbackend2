const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

const connection = require("./database/connection");

const salvarTemporada = require("./controller/seasonController");
const salvarCorridas = require("./controller/racerController");
const salvarCircuitos = require("./controller/circuitController");

app.listen(3001, () => {
  console.log("servidor iniciado na porta 3001");
});
//códigos para mapear as tabelas da api na nossa database.
//salvarTemporada();
//salvarCircuitos();
//salvarCorridas();
