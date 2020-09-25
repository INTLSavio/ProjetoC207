const db = require("../../config/db")
const { date } = require('../../lib/utils')

module.exports = {

    all(callback) {

        db.query(`
        SELECT *
        FROM aluno
        `, (err, results) => {
            if (err) throw `Database error ${err}`
            callback(results)
        })



    },
    create(data, callback) {
        const query = `
            INSERT INTO aluno (
                nome,
                dataNasc,
                numMatricula,
                sexo,
                curso
            ) VALUES ('${data.name}', '${date(data.birth).iso}', ${data.cpf}, '${data.gender}', '${data.course}');
        `


        db.query(query, (err, results) => {
            if (err) throw `Database error ${err}`

            callback(results)

        })
    },

    numEmprestimo(id, callback) {

        db.query(`
            UPDATE aluno SET numEmprestimos=((SELECT count(*) FROM livro WHERE livro.id_aluno = ${id})) WHERE aluno.id= ${id}
        `, (err, results) => {
            if (err) throw `Database error ${err}`

            callback(results)
        })

    },

    find(id, callback) {

        db.query(`
            SELECT * 
            FROM aluno 
            WHERE id = ${id}`, (err, results) => {
            if (err) throw `Database error ${err}`

            callback(results[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE aluno SET
            nome=('${data.name}'),
            dataNasc=('${data.birth}'),
            numMatricula=(${data.cpf}),
            sexo=('${data.gender}'),
            curso=('${data.course}')
        WHERE id = ${data.id}
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM aluno WHERE id = ${id}`, (err, results) => {
            if (err) throw `Database error ${err}`

            return callback()
        })
    }
}