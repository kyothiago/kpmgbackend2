const jwt = require('jsonwebtoken')
const secret = "authformulaone";
const refreshsecret = "authrefresh"
const tokenList = {};
function refreshJWT(req,res,next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            let refreshtoken = req.body.refreshtoken || req.query.refreshtoken || req.headers['x-access-token']
            jwt.verify(refreshtoken, refreshsecret, function (err,decoded){
                if(err){
                return res.status(401).json({"error": true, "message": 'token inválido' });
            }
            req.decoded = decoded; 
            let token = jwt.sign(
                {
                  data: decoded.data,
                },
                secret,
                { expiresIn: "1m" }
              );
              let refreshToken = jwt.sign(
                {
                  data: decoded.data,
                },
                refreshsecret,
               { expiresIn: "1m"}
              );
              const response = {
                "status": "Logged in",
                "id": decoded.data,
                "token": token,
                "refreshToken": refreshToken,
            }
            tokenList[refreshToken] = response
            res.status(200).json(response);
                
            })
        }
      
      next();
    });
  } else {
    return res.status(403).send({
        "error": true,
        "message": 'Sem token.'
    });
  }
}

module.exports = refreshJWT;