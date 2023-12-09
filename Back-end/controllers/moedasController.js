const db = require('../dbConnect');

function Usermoedas(req, res) {
  const idU = req.headers['idu'];

  db.oneOrNone('SELECT pontos.valor FROM usuario INNER JOIN pontos ON pontos.fk_user = usuario.idu where usuario.idu = $1', [idU])
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
  Usermoedas
};