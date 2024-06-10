'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok('Apliaksi Ret API Berhasil Berjalan', res);
};

// Menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fields) {
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res)
        }
    });
}

// Menampilkan semua data mahasiswa bedasarka id
exports.tampilberdasarkanid = function (req, res) {

    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], 
        function (error, rows, fields) {
            if(error){
                connection.log(error);
            }else{
                response.ok(rows, res)
            }
        });
}

// Menambahakan data mahasiswa
exports.tambahmahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?,?,?)',
        [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            }else{
                response.ok("Berhasil Menambahkan Data", res)
            }
        });
}

// Ubah data mahasiswa berdasarkan ID
exports.ubahDataMahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    var id_mahasiswa = req.body.id_mahasiswa;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?',
        [nim, nama, jurusan, id_mahasiswa],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            }else{
                response.ok("Berhasil Mengubah Data", res)
            } 
        });
}

// Hapus data mahasiswa berdasarkan ID
exports.hapusDataMahasiswa = function (req, res) {
    var id_mahasiswa = req.body.id_mahasiswa;

    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id_mahasiswa],
        function (error, rows, fields) {
            if (error) {
                // console.log(error);
                response.err('DATA GAGAL DIHAPUS', res);
            }else{
                response.ok('DATA BERHASIL DIHAPUS', res);
            }
        })
}

// Menampilkan matakuliah group
exports.tampilgroupmatakuliah = function(req, res){
    connection.query('SELECT mahasiswa.id_mahasiswa,mahasiswa.nim,mahasiswa.nama,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa', 
        function (error, rows, fields) {
            if (error) {
                console.log(response.error);
            }else{
                response.oknested(rows, res);
            }
        }
    )
}