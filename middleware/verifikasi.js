const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req, rest, next){
        var role = req.body.role;
        // cek authorize header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function(error, decoded){
                if (error) {
                    return rest.status(401).send({auth:false, message:'Token Tidak Terdaftar'});
                }else{
                    if (role == 2) {
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth:false, message:'Gagal meng otorisais role anda!'});
                    }
                }
            });
        }else{
            return rest.status(401).send({auth:false, message:'Token Tidak Tersedia'});
        }
    }
}

module.exports = verifikasi;