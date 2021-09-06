const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./public/uploads'))
app.use(routes);

const connection = require("./database/connection");

const salvarTemporada = require("./controller/seasonController");
const salvarCorridas = require("./controller/racerController");
const salvarCircuitos = require("./controller/circuitController");

app.listen(3001, () => {
  console.log("servidor iniciado na porta 3001");
});

//salvarTemporada();
//salvarCircuitos();
//salvarCorridas();
