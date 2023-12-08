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

function Usermt1(req, res) {
  const idU = req.headers['idu'];
  db.any('select tempo.dia as days, tempo.hora, tempo.tempofeito, tempo.focusfeito, tempo.tpregistro, gametime.tempomax as tpmax, focustime.tempo as tpfocus from usuario left join tempo on tempo.fk_user = usuario.idu INNER JOIN gametime ON usuario.fk_game = gametime.idg INNER JOIN focustime ON usuario.fk_focus = focustime.idf where idu = $1', [idU])
    .then(resultado => {
      if (resultado) {
        const formattedTpmax = formatTime(resultado.tpmax);
        const formattedTempofeito = formatTime(resultado.tempofeito);
        const formattedfocusfeito= formatTime(resultado.focusfeito);  
        const formattedtpfocus = formatTime(resultado.tpfocus);
        resultado.tpmax = formattedTpmax;
        resultado.tempofeito = formattedTempofeito;
        resultado.focusfeito = formattedfocusfeito;
        resultado.tpfocus = formattedtpfocus;
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
  Usermt1
};