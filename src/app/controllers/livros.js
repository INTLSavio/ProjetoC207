const { date } = require('../../lib/utils')
const Livro = require('../models/Livro')
const Aluno = require('../models/Aluno')


module.exports = {
    index(req, res){  
        Livro.all((livros) => {

            return res.render("livros/index", { livros })
        })

    },

    create(req, res){
        return res.render('livros/create')
  
    },

    post(req, res){
    
        let i = 0
        let idAutor
        let idLivro
        let autores = req.body.autores.split(",")

        
        Livro.createLivro(req.body, (livro) =>{
            idLivro = Number(livro.insertId)

            while(autores[i] != null){
                Livro.createAutor(autores[i], (autor) =>{
                    idAutor = Number(autor.insertId)

                    Livro.createAutorLivro(idAutor, idLivro, (autorLivro) => {
    
                    })
                })
               
    
                i++;
    
            }
            Livro.numAutores(idLivro, (numAutores) =>{

            })
            return res.redirect(`/livros/${livro.insertId}`)
        })

    },

    show(req, res){
        
        Livro.find(req.params.id, (livro)=>{
            if(!livro) return res.send("Livro not found")

            livro.dataPublicacao = date(livro.dataPublicacao).format

            return res.render("livros/show", {livro})
        })
    },

    edit(req, res){
        Livro.find(req.params.id, (livro)=>{
            if(!livro) return res.send("Livro not found")

            livro.dataPublicacao = date(livro.dataPublicacao).iso

            return res.render('livros/edit', { livro })


        })
    },

    put(req, res){
        
        
        Livro.update(req.body, () => {
            return res.redirect(`/livros/${req.body.id}`)
        })
    },

    delete(req, res){
        Livro.delete(req.body.id, () => {
            return res.redirect('/livros')
        })
    },

    loan(req, res){
        let livroD

        Livro.find(req.params.id, (livro)=>{
            if(!livro) return res.send("Livro not found")

            livro.dataPublicacao = date(livro.dataPublicacao).format
            livroD = livro
        })


        Livro.alunoSelectOptions((options) => {
            return res.render("emprestimo/create", {livroD, alunoOptions: options})
        })
        
    },

    createLoan(req, res){
        Livro.createLoan(req.body, () => {

            Aluno.numEmprestimo(req.body.idAluno, (numAutores) =>{
                
            })
            return res.redirect('/livros')
        })

    },

    deleteLoan(req, res){
        
        Livro.deleteLoan(req.body.idLivro, () => {
          
            return res.redirect('/livros')
        })

    }

}
