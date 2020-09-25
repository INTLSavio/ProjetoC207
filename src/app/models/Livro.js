const db = require("../../config/db")
const { date } = require('../../lib/utils')


module.exports = {

    all(callback) {

        db.query(`SELECT * FROM livro`, (err, results) =>{
            if(err) throw `Database error ${err}`
            
            callback(results)
        })

    },
    createLivro(data, callback) {

        db.query(`
            INSERT INTO livro (
                titulo, 
                genero, 
                numPaginas, 
                status, 
                dataPublicacao) VALUES ('${data.titulo}', '${data.genero}', ${data.numPaginas}, ${data.status}, '${data.dataPublicacao}')
                `, (err, results) => {
                    if(err) throw `Database error ${err}`

                    callback(results)
                }
        )

    },

    numAutores(id,callback){
        
        db.query(`
           UPDATE livro SET numAutores=((SELECT count(*) FROM autor_livro WHERE autor_livro.id_livro = ${id})) WHERE livro.id= ${id}
        `, (err, results) => {
            if(err) throw `Database error ${err}`

            callback(results)
        })

    },

    createAutor(data, callback) {
        db.query(`
            INSERT INTO autor(
                nome
            ) VALUE ('${data}')
        `, (err, results) => {
            if(err) throw `Database Erro ${err}`

            callback(results)
        })
    },

    createAutorLivro(idAutor, idLivro, callback) {
        console.log(Number(idAutor))
        
        db.query(`
            INSERT INTO autor_livro(
                id_autor,
                id_livro
            ) VALUES (${idAutor}, ${idLivro})
        `, (err, results) => {
            if(err) throw `Database error ${err}`

            callback(results)
        })
    },

    find(id, callback){

        db.query(`
            SELECT *
            FROM livro 
            WHERE livro.id = ${id}`, (err, results)=>{
                if(err) throw `Database error ${err}`
                
                callback(results[0])
        })
    },
    update(data, callback){
        const query = `
        UPDATE livro SET
            titulo=('${data.titulo}'),
            genero=('${data.genero}'),
            numPaginas=(${data.numPaginas}),
            status=(${data.status}),
            dataPublicacao=('${date(data.dataPublicacao).iso}')
        WHERE id = ${data.id}
        `

        db.query(query, (err, results) => {
            if(err) throw `Database error ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM livro WHERE id = ${id}`, (err, results) =>{
            if (err) throw `Database error ${err}`

            return callback()
        })
    },
    alunoSelectOptions(callback){
        db.query(`SELECT nome, id, numMatricula FROM aluno`, (err, results) => {
            if(err) throw `Database error ${err}`
            callback(results)
            
        })
    },
    createLoan(data, callback){
        db.query(`UPDATE livro SET status = 1, livro.id_aluno = ${data.idAluno} WHERE livro.id = ${data.idLivro}`, (err, results) => {
            if(err) throw `Database error ${err}`

            return callback()
        })
    },
    deleteLoan(id, callback){
        db.query(`UPDATE livro SET status = 0, livro.id_aluno = null WHERE livro.id = ${id}`, (err, results) => {
            if(err) throw `Database error ${err}`

            return callback()
        })
    }
}