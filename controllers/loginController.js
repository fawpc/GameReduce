const db = require('../dbConnect');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

function loginUser(req, res) {
  const { email, senha } = req.body;

  db.oneOrNone('SELECT * FROM usuario WHERE email = $1 AND senha = $2', [email, senha])
    .then(user => {
      if (user) {
        const payload = {
          usuarioId: user.idU,
          nome: user.nome
        };
        const token = jwt.sign(payload, secret, { expiresIn: '6h' });
        res.json({ token, idU: user.idu });
      } else {
        res.status(401).send('Credenciais inválidas');
      }
    })
    .catch(error => {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).send('Erro interno do servidor');
    });
}

module.exports = {
  loginUser
};