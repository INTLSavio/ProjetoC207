const { date } = require('../../lib/utils')
const Aluno = require('../models/Aluno')

module.exports = {

    index(req, res){ 

        Aluno.all((alunos) => {
           
            return res.render("alunos/index", { alunos })
        })
  
    },

    create(req, res){
        return res.render("alunos/create")      
    },

    post(req, res){
        let idAluno

        Aluno.create(req.body, (aluno) =>{
            

            return res.redirect(`alunos/${aluno.insertId}`)
        })

        
    },

    show(req, res){
        
        Aluno.find(req.params.id, (aluno)=>{
            if(!aluno) return res.send("Aluno not found")

            aluno.dataNasc = date(aluno.dataNasc).format

            return res.render("alunos/show", {aluno})
        })
    },
    

    edit(req, res){
        Aluno.find(req.params.id, (aluno)=>{
            if(!aluno) return res.send("Aluno not found")

            return res.render("alunos/edit", {aluno})
        })
    },

    put(req, res){
       
        
        Aluno.update(req.body, () => {
            return res.redirect(`/alunos/${req.body.id}`)
        })
    },

    delete(req, res){
        Aluno.delete(req.body.id, () => {
            return res.redirect('/alunos')
        })
    }

}
