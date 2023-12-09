const db = require('../dbConnect');

function Userstats(req, res) {
  const idU = req.headers['idu'];

  db.oneOrNone('SELECT usuario.nome, perfil.estilo, gametime.tempomax, gametime.pontos AS pontos_gametime, focustime.tempo, focustime.pontos AS pontos_focustime, pontos.valor, resgate.dataresgate FROM usuario INNER JOIN perfil ON usuario.fk_perfil = perfil.idp INNER JOIN gametime ON usuario.fk_game = gametime.idg INNER JOIN focustime ON usuario.fk_focus = focustime.idf INNER JOIN pontos ON pontos.fk_user = usuario.idu LEFT JOIN resgate ON resgate.fk_user = usuario.idu WHERE usuario.idu = $1 LIMIT 1', [idU])
    .then(resultado => {
      if (resultado) {
        res.json({ user: resultado});
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
  Userstats
};