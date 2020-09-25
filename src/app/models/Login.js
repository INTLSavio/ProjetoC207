const db = require("../../config/db")


module.exports = {

    verificar(data, callback) {
        db.query(`SELECT * FROM responsavel`, (err, results) => {
            if(err) throw `Database error ${err}`
            if(results[0].senha== data.senha){
                callback(true)
            }else{
                callback(false)
            }    
        })
    }

}