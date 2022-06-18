const RekamMedis = require('../../models/RekamMedis')
const axios = require('axios');
const {API_URL_KTP,API_URL_INTEROP,NAMA_RUMAH_SAKIT } = process.env
module.exports = {
    index: async(req,res)=>{
        try {
            // const { id } = req.params
            const rekammedis = await RekamMedis.find()
            res.render('rekammedis/view',{
                title:'Rekam Medis', 
                rekammedis
            })
        } catch (error) {
            console.log(error)
        }
    },
    viewCreate : async(req,res)=>{
        try {
            res.render('rekammedis/create',{
                title:'Create Rekam Medis'
            })
        } catch (error) {
            console.log(error)
        }
    },
    actionCreate : async(req,res)=>{
        try {
            const {
                nik,
                kontakNama, 
                hubungan, 
                kontakAlamat, 
                kontakKelurahan,
                kontakKecamatan, 
                kontakKabupaten, 
                kontakProvinsi, 
                kontakNoHp,
                tanggal,
                tanggalkeluar,
                diagnosis,
                hasilpemeriksaanfisik,
                hasilpemeriksaanpenunjang,
                diagnosisakhir,
                pengobatantindakan,
                tindaklanjut,
                dokter
            } = req.body
            const response = await axios({
                method: 'get',
                url: `${API_URL_KTP}/api/penduduk/${nik}`
              }).catch(function (error) {
                console.log(error.response.data.message)
                res.redirect("/rekammedis/create")
              })
            const dataPasien = response.data.data
            const kontakPasien = {
                nama : kontakNama,
                hubungan : hubungan,
                no_hp : kontakNoHp,
                alamat : {
                    alamat : kontakAlamat,
                    kelurahan : kontakKelurahan,
                    kecamatan : kontakKecamatan,
                    kabupaten : kontakKabupaten,
                    provinsi : kontakProvinsi
                }
            }
            let rekammedis = await RekamMedis({
                pasien : {
                    nik : nik,
                    nama : dataPasien.nama,
                    jenis_kelamin : dataPasien.jenis_kelamin,
                    alamat : {
                        alamat : dataPasien.alamat,
                        kelurahan : dataPasien.kelurahan,
                        kecamatan : dataPasien.kecamatan,
                        kabupaten : dataPasien.kabupaten,
                        provinsi : dataPasien.provinsi
                    }
                },
                kontak : kontakPasien,
                tanggal,
                tanggal_keluar : tanggalkeluar,
                diagnosis,
                hasil_pemeriksaan_fisik : hasilpemeriksaanfisik,
                hasil_pemeriksaan_penunjang : hasilpemeriksaanpenunjang,
                diagnosis_akhir : diagnosisakhir,
                pengobatan_tindakan : pengobatantindakan,
                tindak_lanjut : tindaklanjut,
                dokter
            })
            const createData = await rekammedis.save()
            await axios({
                method: 'post',
                url: `${API_URL_INTEROP}/api/rekammedis/create`,
                data: {
                    rm_id : createData._id,
                    rumah_sakit : NAMA_RUMAH_SAKIT,
                    nik : nik,
                    nama : dataPasien.nama,
                    jenis_kelamin : dataPasien.jenis_kelamin,
                    alamat : dataPasien.alamat,
                    kelurahan : dataPasien.kelurahan,
                    kecamatan : dataPasien.kecamatan,
                    kabupaten : dataPasien.kabupaten,
                    provinsi : dataPasien.provinsi,
                    kontakNama, 
                    hubungan, 
                    kontakAlamat, 
                    kontakKelurahan,
                    kontakKecamatan, 
                    kontakKabupaten, 
                    kontakProvinsi, 
                    kontakNoHp,
                    tanggal,
                    tanggalkeluar,
                    diagnosis,
                    hasilpemeriksaanfisik,
                    hasilpemeriksaanpenunjang,
                    diagnosisakhir,
                    pengobatantindakan,
                    tindaklanjut,
                    dokter
                }
              }).catch(function (error) {
                console.log(error.response.data.message)
                res.redirect("/rekammedis/create")
              })
            res.redirect("/rekammedis")
        } catch (error) {
            console.log(error)
        }
    },
    viewSingle : async(req,res)=>{
        try {
            const {id} = req.params
            const rekammedis = await RekamMedis.findOne({_id : id})
            res.render('rekammedis/single',{
                title:'Rekam Medis Pasien', 
                rekammedis
            })
        } catch (error) {
            console.log(error)
        }
    },
    viewEdit : async(req,res)=>{
        try {
            const {id} = req.params
            const rekammedis = await RekamMedis.findOne({_id : id})
            res.render('rekammedis/edit',{
                title:'Edit Rekam Medis Pasien', 
                rekammedis
            })
        } catch (error) {
            console.log(error)
        }
    },
    actionEdit : async(req,res)=>{
        try {
            const { id } = req.params
            const {
                kontakNama, 
                hubungan, 
                kontakAlamat, 
                kontakKelurahan,
                kontakKecamatan, 
                kontakKabupaten, 
                kontakProvinsi, 
                kontakNoHp,
                tanggal,
                tanggalkeluar,
                diagnosis,
                hasilpemeriksaanfisik,
                hasilpemeriksaanpenunjang,
                diagnosisakhir,
                pengobatantindakan,
                tindaklanjut,
                dokter
            } = req.body
            const kontakPasien = {
                nama : kontakNama,
                hubungan : hubungan,
                no_hp : kontakNoHp,
                alamat : {
                    alamat : kontakAlamat,
                    kelurahan : kontakKelurahan,
                    kecamatan : kontakKecamatan,
                    kabupaten : kontakKabupaten,
                    provinsi : kontakProvinsi
                }
            }
            const rekammedis = await RekamMedis.findOneAndUpdate({
                _id:id
            },{
                kontak : kontakPasien,
                tanggal,
                tanggal_keluar : tanggalkeluar,
                diagnosis,
                hasil_pemeriksaan_fisik : hasilpemeriksaanfisik,
                hasil_pemeriksaan_penunjang : hasilpemeriksaanpenunjang,
                diagnosis_akhir : diagnosisakhir,
                pengobatan_tindakan : pengobatantindakan,
                tindak_lanjut : tindaklanjut,
                dokter
            })
            res.redirect(`/rekammedis/view/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}