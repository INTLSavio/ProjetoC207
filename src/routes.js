const express = require('express')
const routes = express.Router()
const alunos = require('./app/controllers/alunos')
const livros = require('./app/controllers/livros')
const detalhes = require('./app/controllers/detalhes')
const login = require('./app/controllers/login')
                                                            
routes.get('/', (req, res) => {
    return res.redirect("/verificacao")    
})

routes.get('/verificacao', login.index)
routes.post("/login", login.login)
                                   
routes.get('/alunos', alunos.index)                                                                                         
routes.get('/alunos/create', alunos.create)                                                                                                                                  
routes.get('/alunos/:id', alunos.show)                                                                                            
routes.get('/alunos/:id/edit', alunos.edit)                                                                                 
routes.post("/alunos", alunos.post)                                                                                                 
routes.put("/alunos", alunos.put)                                                                                                                        
routes.delete('/alunos', alunos.delete)       
                                    
routes.get('/livros', livros.index)                                                                                                
routes.get('/livros/create', livros.create)                                                                  
routes.get('/livros/:id', livros.show)                                                                      
routes.get('/livros/:id/edit', livros.edit)                                                                
routes.post("/livros", livros.post)                                                                        
routes.put("/livros", livros.put)                                                                          
routes.delete('/livros', livros.delete)  
routes.get('/livros/:id/emprestimo', livros.loan)

routes.post("/emprestimo", livros.createLoan)
routes.post("/retirar", livros.deleteLoan)

routes.get('/detalhes', detalhes.index)


module.exports = routes