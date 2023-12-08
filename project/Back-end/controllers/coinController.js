const db = require('../dbConnect');

function obterNumeroDeMoedas(req, res) {
  const idU = req.headers['idu'];

  db.oneOrNone('SELECT valor FROM pontos WHERE fk_user = $1', [idU])
    .then(resultado => {
      if (resultado) {
        res.json({ moedas: resultado.valor });
      } else {
        res.status(404).send('Usuário não encontrado ou sem moedas.');
      }
    })
    .catch(error => {
      console.error('Erro ao verificar número de moedas:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
  obterNumeroDeMoedas
};