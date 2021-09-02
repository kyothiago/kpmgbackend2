const Season = require("../model/Racer");
const axios = require("axios");

function transformarCorrida(objetoApi) {
  return {
    corridaRef: objetoApi.corridaId,
    corridaNumero: objetoApi.round,
    corridaNome: objetoApi.raceName,
    circuitoRef: objetoApi.Circuit.circuitoRef,
    corridaData: objetoApi.date,
    corridaUrl: objetoApi.url,
    temporadaAno: objetoApi.season,
    corridaHora: objetoApi.time,
  };
}

async function getCorridas() {
  let corridas = [];
  await axios
    .get("http://ergast.com/api/f1/races.json?limit=1060")
    .then(function (res) {
      corridas = res.data.MRData.RaceTable.Races;
    });

  //console.log(corridas)
  return corridas;
}

async function salvarCorridas() {
  //obtem dados da api
  const corridasApi = await getCorridas();
  //converte dados da api para modelo
  let listaCorridas = corridasApi.map((corrida) => {
    return transformarCorrida(corrida);
  });
  //salva os dads convertidos no banco
  Season.bulkCreate(listaCorridas);
}

module.exports = salvarCorridas;
