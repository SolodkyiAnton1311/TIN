const db = require("../../config/mysql2/db");
const authUntil = require('../../util/authUtils')
exports.findByEmail = (Email) =>
{
    const sql ="SELECT * FROM UserPass WHERE email = ?";
    return db.promise().query(sql,[Email]).then((result)=>{
        return result[0][0]
    }).catch(err=>{
        throw err;
    })
}
exports.deleteUser = (userId) => {
    const sql = "DELETE FROM UserPass WHERE id = ?";
    return db.promise().execute(sql, [userId]);
}
exports.createUser = (user) => {
    const passHash = authUntil.hashPassword(user.password)
    const sql = "INSERT INTO UserPass ( email, password,isAdmin) VALUES (?,?,?);"
    return  db.promise().execute(sql,[user.email,passHash,user.isAdmin]);
};