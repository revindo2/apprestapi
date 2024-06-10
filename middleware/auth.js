var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

// connection untuk register
exports.registrasi = function(req, res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? where ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if (error) {
            console.log(error);
        }else{
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if (error) {
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambhakan data user", res);
                    }
                })
            }else{
                response.ok("Email sudah terdaftar", res);
            }
        }
    })
}

// Controller untuk login
exports.login = function(req, res){
    var post = {
        password: req.body.password,
        email: req.body.email 
    }

    // var query = "SELECT * FROM ? WHERE ??=? AND ??=?";
    // var table = ['user', "password", md5(post.password), "email", post.email];
    
    // query = mysql.format(query, table);
    connection.query('SELECT * FROM user WHERE password=? AND email=?',[md5(post.password), post.email], function(error, rows){
        if (error) {
            console.log(error);
        }else{
            
            if (rows.length == 1) {
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440
                });
                var id_user =  rows[0].id;
                // id_user: rows[0].id;
                
                var data = {
                    id_user: rows[0].id,
                    access_token: token,
                    ip_adress: ip.address()
                }

                // res.json({"Error":true,"data":data, "message":"email atau password salah!ssss"});

                var query = "iNSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if (error) {
                        console.log(error);
                    }else{
                        res.json({
                            success: true,
                            message: "Token JWT tergenerate",
                            token: token,
                            currUser: id_user
                        });
                    }
                });
            }else{
                res.json({"Error":true, "message":"email atau password salah!"});
            }
        }
    });
}

exports.halamanrahasia = function (req, res) {
    response.ok("Halaman ini hanya untuk user dengan role 2", res);
}