const Login = require('../models/Login')

module.exports = {
    index(req, res){   
        res.render("login")
    },
    login(req, res){
        Login.verificar(req.body, (logado) => {
            if(logado){
                res.redirect("/alunos");
            }else {
                
            }
        })
    }
}