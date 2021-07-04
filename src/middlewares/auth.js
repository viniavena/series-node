const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: 'Sem token' });

  const parts = authHeader.split(' ');

  if (parts.lenght != 2) {
    return res.status(401).send({ error: 'Erro no token' });
  }

  const [scheme, token] = parts;

  if (!scheme.test(/^Bearer$/i))
    return res.status(401).send({ error: 'Token mal formatado' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalido' });

    req.userId = decoded.id;

    return next();
  });
};
