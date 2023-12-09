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

function Userfocus(req, res) {
  const idU = req.headers['idu'];

  db.oneOrNone('SELECT focustime.tempo, focustime.pontos AS pontos_focustime, usuario.focusfeito FROM usuario INNER JOIN focustime ON usuario.fk_focus = focustime.idf WHERE usuario.idu = $1', [idU])
    .then(resultado => {
      if (resultado) {
        const formattedTempo = formatTime(resultado.tempo);
        const formattedfocusfeito = formatTime(resultado.focusfeito);
        resultado.tempo = formattedTempo;
        resultado.focusfeito = formattedfocusfeito;
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
  Userfocus
};