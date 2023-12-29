module.exports = function (req, res, next) {
    const apiToken = req.header('Authorization');

  if (!apiToken || !apiToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Brak autoryzacji' });
  }

  next();
}