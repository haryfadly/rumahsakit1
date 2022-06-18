const RekamMedis = require('../../models/RekamMedis')
const axios = require('axios');
const { API_URL_INTEROP } = process.env
module.exports = {
    index: async(req,res)=>{
        try {
            const response = await axios({
                method: 'get',
                url: `${API_URL_INTEROP}/api/rekammedis`
              }).catch(function (error) {
                console.log(error.response.data.message)
                res.redirect("/pasien/view")
              })
            const rekammedis = response.data.data
            res.render('pasien/view',{
                title:'Rekam Medis',
                rekammedis
            })
        } catch (error) {
            console.log(error)
        }
    },
    viewSingle : async(req,res)=>{
        try {
            const {id} = req.params
            const response = await axios({
                method: 'get',
                url: `${API_URL_INTEROP}/api/rekammedis/${id}`
              }).catch(function (error) {
                console.log(error.response.data.message)
                res.redirect("/pasien/view")
              })
            const rekammedis = response.data.data
            res.render('pasien/single',{
                title:'Rekam Medis Pasien', 
                rekammedis
            })
        } catch (error) {
            console.log(error)
        }
    }
}