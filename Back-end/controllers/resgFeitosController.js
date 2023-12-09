const db = require('../dbConnect');

function ResgFeitos(req, res) {
  const idU = req.headers['idu'];

  db.manyOrNone('select premios.descricao, premios.valor, resgate.chave, dataresgate from resgate inner join premios on resgate.fk_premios = premios.idprem where fk_user = $1 order by dataresgate desc limit 5', [idU])
    .then(resultado => {
      if (resultado.length > 0) {
        res.json({ resgates : resultado});
      } else {
        res.status(404).send('Nenhum resgate feito por esse usuário encontrado.');
      }
    })
    .catch(error => {
      console.error('Erro ao verificar os dados:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
    ResgFeitos
};