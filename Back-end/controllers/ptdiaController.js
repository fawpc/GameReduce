const db = require('../dbConnect');

function Userptdia(req, res) {
  const idU = req.headers['idu'];
  db.any('select pontosdia.pontosgame, pontosdia.pontosfocus, pontosdia.dia as ptdia from usuario left join pontosdia on pontosdia.fk_user = usuario.idu where idu = $1', [idU])
    .then(resultado => {
      if (resultado) {
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
  Userptdia
};