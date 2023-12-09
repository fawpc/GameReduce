const db = require('../dbConnect');

function Userothers(req, res) {
  const idU = req.headers['idu'];

  db.manyOrNone('SELECT premios.idprem, premios.valor, premios.descricao FROM premios WHERE premios.fk_perfil NOT IN (SELECT usuario.fk_perfil FROM usuario WHERE usuario.idu = $1) ORDER BY premios.valor ASC', [idU])
    .then(resultado => {
      if (resultado.length >0) {
        res.json({ premiosOutrosEstilos: resultado});
      } else {
        res.status(404).send('Nenhum outro prêmio de outros estilos encontrado.');
      }
    })
    .catch(error => {
      console.error('Erro ao verificar os dados:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
  Userothers
};