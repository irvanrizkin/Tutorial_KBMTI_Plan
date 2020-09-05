const db = require('_helpers/db');
const bcrypt = require('bcryptjs');

const getAll =  () => {
    return new Promise ( (resolve, reject) => {
        let query = 'SELECT * FROM users'
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        });
    } ) 
}


const getById = (id) => {
    return new Promise( (resolve, reject) => {
        let query = `SELECT * FROM users WHERE id = ${id}`
        db.query(query, ( err, data ) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(...data)
            } 
        })
    }  );
}

const register = ( {first_name, last_name, password} ) => {
    return new Promise( (resolve, reject) => {
        let hashPassword = bcrypt.hashSync(password)
        let query = `INSERT INTO users (first_name, last_name, hashPassword) VALUES ('${first_name}', '${last_name}', '${hashPassword}')`
        db.query(query, ( err, data ) => {
            if (err) reject(err)
            else resolve(data)
        })
    } )
}

const update = (id, {first_name, last_name}) => {
    return new Promise( (resolve, reject) => {
        let query = `UPDATE users SET first_name='${first_name}', last_name='${last_name}' WHERE id=${id}`
        db.query(query, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    } );
}

const _delete = (id) => {
    return new Promise( (resolve, reject) => {
        let query =  `DELETE FROM users WHERE id=${id}`
        db.query(query, ( err, data ) => {
            if (err) reject(err)
            else resolve(data)
        })
    } );
}


module.exports = {
    getAll,
    getById,
    register,
    update,
    _delete,
}