const jwt = require('jsonwebtoken')
const secret = "authformulaone";

module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({"error": true, "message": 'Sem acesso autorizado' });
        }
      req.decoded = decoded;
      next();c
    });
  } else {
    return res.status(403).send({
        "error": true,
        "message": 'Sem token.'
    });
  }
}