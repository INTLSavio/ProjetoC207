const { date } = require('../../lib/utils')
const Livro = require('../models/Livro')
const Aluno = require('../models/Aluno')


module.exports = {
    index(req, res){   


        Livro.all((livros) => {

            for(let i = 0; i < livros.length; i++){
                Livro.numAutores(livros[i].id, (numAutores) =>{
                    
                })
            }

            Aluno.all((alunos) => {   
                
                for(let i = 0; i < alunos.length; i++)
                    Aluno.numEmprestimo(alunos[i].id, (numEmprestimo) =>{
                    })
                    

                return res.render("detalhes", { livros, alunos })
            })
        })

    }
}