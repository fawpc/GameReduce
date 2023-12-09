const db = require('../dbConnect');

function AllStyles(req, res) {
  db.any('SELECT idp, estilo FROM perfil')
    .then(resultado => {
      const dados= resultado.map(item => ({
        idp: item.idp,
        estilo: item.estilo
     
    }));
    res.json(dados);
  }) 
    .catch(error => {
      console.error('Erro ao obter os tempos de Game Time:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
  AllStyles
};