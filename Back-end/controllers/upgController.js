const db = require('../dbConnect');

function Upgame(req, res) {
  const idU = req.headers['idu'];
  const tempoRecebido = req.headers['newtempofeito'];
  const horario = req.headers['horario'];
  const dia = req.headers['dia'];
  const tpregistro = req.headers['tpregistro'];

  db.one('SELECT tempofeito FROM usuario WHERE idu = $1', idU)
    .then(resultado => {
      if (resultado) {
        db.tx(t => {
          const queryUsuario = t.none('UPDATE usuario SET tempofeito = tempofeito + INTERVAL $1 WHERE idu = $2', [tempoRecebido, idU]);
          const queryTempo = t.none('INSERT INTO tempo (fk_user, tempofeito, focusfeito, dia, hora, tpregistro) VALUES ($1, $2,\'00:00:00\', $3, $4, $5)', [idU, tempoRecebido, dia, horario, tpregistro]);
          return Promise.all([queryUsuario, queryTempo]);
        })
        .then(() => {
          res.status(201).send('Created');
        })
        .catch(error => {
          console.error('Erro ao verificar os dados:', error);
          res.status(500).send('Erro interno do servidor');
        });
      } else {
        res.status(404).send('Usuário não encontrado');
      }
    })
    .catch(error => {
      console.error('Erro ao verificar os dados:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
  Upgame
};