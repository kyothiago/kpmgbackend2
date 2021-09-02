const Season = require("../model/Circuit");
const axios = require("axios");

function transformarCircuito(objetoApi){
    return ({
        circuitoRef: objetoApi.circuitId,
        circuitoNome: objetoApi.circuitName,
        circuitoLatitude: objetoApi.Location.lat,
        circuitoLongitude: objetoApi.Location.long,
        circuitoLocalizacao: objetoApi.Location.locality,
        circuitoPais: objetoApi.Location.country,
        circuitoUrl: objetoApi.url
    })

};

async function getCircuitos(){
    let circuitos = [];
        await axios.get("http://ergast.com/api/f1/circuits.json?limit=80").then(function(res){
        circuitos = res.data.MRData.CircuitTable.Circuits;
    })
    
    //console.log(circuitos)
    return circuitos;
    
};


async function salvarCircuitos(){

    //obtem dados da api
    const circuitosApi = await getCircuitos();
    //converte dados da api para modelo
    let listaCircuitos = circuitosApi.map((circuito) =>{
        return transformarCircuito(circuito);
    });
    //salva os dads convertidos no banco
    Season.bulkCreate(listaCircuitos);
}

module.exports = salvarCircuitos;