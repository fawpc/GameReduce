const db = require('../dbConnect');

function AllGame(req, res) {
  db.any('SELECT idg, tempomax, pontos AS pontos_gametime, perdapontos FROM gametime')
    .then(resultado => {
      const formattedData = resultado.map(item => ({
        tempomax: {
          hours: item.tempomax.hours,
          minutes: item.tempomax.minutes,
          seconds: item.tempomax.seconds
        },
        pontos_gametime: item.pontos_gametime,
        perdapontos: item.perdapontos,
        idg: item.idg
      }));
      res.json(formattedData);
    })
    .catch(error => {
      console.error('Erro ao obter os tempos de Game Time:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
  AllGame
};