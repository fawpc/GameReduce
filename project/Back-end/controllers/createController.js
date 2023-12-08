const db = require('../dbConnect');

async function createUser(req, res) {
  const { nome, email, senha, datanasc, fk_perfil, fk_game, fk_focus } = req.body;

  try {
    const usuarioResult = await db.one(
      'INSERT INTO usuario (nome, email, senha, datanasc, fk_perfil, fk_game, fk_focus, tempofeito, focusfeito) VALUES ($1, $2, $3, $4, $5, $6, $7, \'00:00:00\', \'00:00:00\') RETURNING idu',
      [nome, email, senha, datanasc, fk_perfil, fk_game, fk_focus]
    );

    const novoUsuarioId = usuarioResult.idu;

    await db.none('INSERT INTO pontos (fk_user, valor) VALUES ($1, $2)', [novoUsuarioId, 0]);

    res.status(201).send('Usuário criado com sucesso e pontos iniciais registrados.');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).send('Ocorreu um erro ao criar o usuário.');
  }
}

module.exports = {
  createUser
};