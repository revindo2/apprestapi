'use strict';

module.exports = function(app) {
    var jsonku = require('./controller');

    // ROUTE INDEX
    app.route('/')
        .get(jsonku.index);

    // ROUTE TAMPILKAN DATA
    app.route('/tampil')
        .get(jsonku.tampilsemuamahasiswa);

    // ROUTE TAMPILKAN BEDASARKAN ID
    app.route('/tampil/:id')
        .get(jsonku.tampilberdasarkanid);

    // ROUTE TAMBAH DATA
    app.route('/tambah')
        .post(jsonku.tambahmahasiswa);

    // ROUTE UBAH DATA BEDASARKAN ID
    app.route('/ubahdata')
        .put(jsonku.ubahDataMahasiswa);

    // ROUTE HAPUS DATA
    app.route('/hapus')
        .delete(jsonku.hapusDataMahasiswa);

    // ROUTE HAPUS DATA
    app.route('/tampilmatakuliah')
        .get(jsonku.tampilgroupmatakuliah);
}