const UserRepository = require("../repository/mysql2/UserRepository");
const authUntil = require("../util/authUtils");
const createUser = require("../api/userApi");


exports.login =(req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;

    UserRepository.findByEmail(email).then(user =>{

        if (!user)
        {
            res.render('index',{
                navLocation:'',
                loginError:"Nie prawidlowy email"
            })
        }
            else if (authUntil.comparePasswords(password,user.password) === true)
        {
            req.session.loggedUser = user;
            res.redirect('/');
        }
        else {
            res.render('index',{
                navLocation:'',
                loginError:"Nieprawidlowe  haslo"
            })
        }
    }).catch(err =>{
        console.log(err)
    })
}
exports.logout= (req, res,next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
exports.createUser = (req,res,next) =>{
    const userId={...req.body};
    UserRepository.createUser(userId).then(result =>{
        res.redirect('/users');
})}