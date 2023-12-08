
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

function Usermeta(req, res) {
  const idU = req.headers['idu'];
  db.any('select tempofull.dia, tempofull.tempototal, tempofull.focustotal, gametime.tempomax, focustime.tempo from usuario left join tempofull on tempofull.fk_user = usuario.idu INNER JOIN gametime ON usuario.fk_game = gametime.idg INNER JOIN focustime ON usuario.fk_focus = focustime.idf where idu = $1 order by dia desc limit 7', [idU])
    .then(resultado => {
      if (resultado) {
        const formattedTempomax = formatTime(resultado.tempomax);
        const formattedTempototal = formatTime(resultado.tempototal);
        const formattedfocustotal= formatTime(resultado.focustotal);  
        const formattedTempo = formatTime(resultado.tempo);
        resultado.tempomax = formattedTempomax;
        resultado.tempototal = formattedTempototal;
        resultado.focustotal = formattedfocustotal;
        resultado.tempo = formattedTempo;
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
  Usermeta
};





