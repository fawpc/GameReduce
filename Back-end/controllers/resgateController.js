const db = require('../dbConnect');

async function resgate(req, res) {
  const { idprem, valor } = req.body;
  const idU = req.headers['idu'];

  try {
    const resgateResult = await db.oneOrNone(
      'SELECT idresg, chave FROM resgate WHERE fk_premios = $1 AND resgatado = false LIMIT 1',
      [idprem]
    );

    if (!resgateResult) {
      return res.status(404).send('Nenhum prêmio disponível para resgate.');
    }

    const { idresg, chave } = resgateResult;

    const pontosUsuario = await db.one('SELECT valor FROM pontos WHERE fk_user = $1', [idU]);

    if (pontosUsuario.valor < valor) {
      return res.status(400).send('Pontos insuficientes para resgatar este prêmio.');
    }

    await db.none('UPDATE resgate SET fk_user = $1, resgatado = true, dataresgate = CURRENT_DATE WHERE idresg = $2', [idU, idresg]);

    await db.none('UPDATE pontos SET valor = valor - $2 WHERE fk_user = $1', [idU, valor]);

    res.status(201).send({ message: 'Resgate realizado com sucesso.', chave });
  } catch (error) {
    console.error('Erro ao fazer o resgate:', error);
    res.status(500).send('Ocorreu um erro ao fazer o resgate.');
  }
}

module.exports = {
  resgate
};