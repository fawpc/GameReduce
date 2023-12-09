const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).send('Acesso negado');
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    console.log('Erro na verificação do token:', err);
    res.status(400).send('Token inválido');
  }
}

module.exports = verifyToken;