const db = require('../dbConnect');

function Upfocus(req, res) {
  const idU = req.headers['idu'];
  const focusRecebido = req.headers['focusfeito'];
  const horario = req.headers['horario'];
  const dia = req.headers['dia'];
  const tpregistro = req.headers['tpregistro'];

  db.one('SELECT focusfeito FROM usuario WHERE idu = $1', idU)
    .then(resultado => {
      if (resultado) {
        db.tx(t => {
          const queryUsuario = t.none('UPDATE usuario SET focusfeito = focusfeito + INTERVAL $1 WHERE idu = $2', [focusRecebido, idU]);
          const queryfocus = t.none('INSERT INTO tempo (fk_user, focusfeito, tempofeito, dia, hora, tpregistro) VALUES ($1, $2, \'00:00:00\', $3, $4, $5)', [idU, focusRecebido, dia, horario, tpregistro]);
          return Promise.all([queryUsuario, queryfocus]);
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
  Upfocus
};