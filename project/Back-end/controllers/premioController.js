const db = require('../dbConnect');

function Userpremio(req, res) {
  const idU = req.headers['idu'];

  db.manyOrNone('SELECT premios.idprem, premios.valor, premios.descricao FROM usuario INNER JOIN perfil ON usuario.fk_perfil = perfil.idp INNER JOIN premios ON premios.fk_perfil = perfil.idp WHERE usuario.idu = $1', [idU])
    .then(resultado => {
      if (resultado.length > 0) {
        res.json({ premiosEstiloUsuario : resultado});
      } else {
        res.status(404).send('Nenhum prêmio para o estilo do usuário encontrado.');
      }
    })
    .catch(error => {
      console.error('Erro ao verificar os dados:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
  Userpremio
};