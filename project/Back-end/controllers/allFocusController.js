const db = require('../dbConnect');

function AllFocus(req, res) {
    db.any('SELECT idf, tempo, pontos AS pontos_focustime FROM focustime order by tempo')
      .then(resultado => {
        const formattedData = resultado.map(item => ({
          tempo: {
            hours: item.tempo.hours,
            minutes: item.tempo.minutes,
            seconds: item.tempo.seconds
          },
          pontos_focustime: item.pontos_focustime,
          idf: item.idf
        }));
        res.json(formattedData);
      })
      .catch(error => {
        console.error('Erro ao obter os tempos de Focus Time:', error);
        res.status(500).send('Erro interno do servidor');
      });
  }

module.exports = {
  AllFocus
};

