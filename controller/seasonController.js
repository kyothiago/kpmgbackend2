const Season = require("../model/Season");
const axios = require("axios");


function transformarTemporada(objetoApi){
    return ({
        temporadaAno: objetoApi.season,
        temporadaUrl: objetoApi.url
    })

}


async function getTemporada(){
    let temporadas = [];
        await axios.get("http://ergast.com/api/f1/seasons.json?limit=80").then(function(res){
        temporadas = res.data.MRData.SeasonTable.Seasons;
    })
    
    //console.log(temporadas)
    return temporadas;
    
};


async function salvarTemporada(){

    //obtem dados da api
    const temporadasApi = await getTemporada();
    //converte dados da api para modelo
    let listaTemporadas = temporadasApi.map((temporada) =>{
        return transformarTemporada(temporada);
    });
    //salva os dads convertidos no banco
    Season.bulkCreate(listaTemporadas);
}

module.exports = salvarTemporada;