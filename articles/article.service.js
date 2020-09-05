const db = require('_helpers/db')

// User Service

// Module Exports
module.exports = {
    getAll,
    getById,
    store,
    update,
    delete: _delete
}

// Functions

function getAll(){
    return new Promise( (resolve, reject) => {
        let query = `SELECT * FROM articles`
        db.query(query, ( err, data ) => {
            if (err) reject(err)
            else resolve(data)
        });
    } );
}

function getById(id){
    return new Promise( (resolve, reject) => {
        let query = `SELECT * FROM articles 
                     WHERE id=${id}`
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(...data)
        })
    } )
}

function store({title, content, user_id}){
    return new Promise(( resolve, reject ) => {
        let query = `INSERT INTO articles (title, content, user_id) VALUES('${title}', '${content}', '${user_id}')`
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function update(id, {title, content}){
    return new Promise( (resolve, reject) => {
        let query = `UPDATE articles SET title='${title}', content='${content}' WHERE id=${id}`
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    } )
}

function _delete(id){
    return new Promise( (resolve, reject) => {
        let query = `DELETE FROM articles WHERE id=${id}`
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    } )
}