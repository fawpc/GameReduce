const db = require('../dbConnect');

const formatTime = (interval) => {
  if (interval) {
    const hours = interval.hours || 0;
    const minutes = interval.minutes || 0;
    const seconds = interval.seconds || 0;

    return `${hours}:${minutes}:${seconds}`;
  }
  return '00:00:00';
};

function Usergame(req, res) {
  const idU = req.headers['idu'];

  db.oneOrNone('SELECT gametime.tempomax, gametime.pontos AS pontos_gametime, gametime.perdapontos, usuario.tempofeito FROM usuario INNER JOIN gametime ON usuario.fk_game = gametime.idg WHERE usuario.idu = $1', [idU])
    .then(resultado => {
      if (resultado) {
        const formattedTempomax = formatTime(resultado.tempomax);
        const formattedTempofeito = formatTime(resultado.tempofeito);
        resultado.tempomax = formattedTempomax;
        resultado.tempofeito = formattedTempofeito;
        res.json({ user: resultado });
      } else {
        res.status(404).send('Usuário não encontrado ou sem dados.');
      }
    })
    .catch(error => {
      console.error('Erro ao verificar os dados:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
  Usergame
};