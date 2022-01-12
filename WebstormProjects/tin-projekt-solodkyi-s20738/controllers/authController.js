const KlientRepository = require("../repository/mysql2/KlientRepository");

exports.login =(req , res , next )=>
{
const lastName = req.body.Nazwisko;
const password = req.body.password;
KlientRepository.findByLastName(lastName).then(klient =>
{
    if (!klient)
    {
        res.render('index',{
            navLocation:'',
            loginError:"Nieprawidlowe nazwisko lub haslo"
        })
    }
    else if (klient.password === password)
    {
        req.session.loggedUser = klient;
        res.redirect('/');
    }
    else {
        res.render('index',{
            NavLocation:'',
            loginError:"Nieprawidlowe nazwisko lub haslo"
        })
    }
}).catch(err=>{
    console.log(err)
})
}
exports.logout = (req,res,next) =>
{
    req.session.loggedUser = undefined;
    res.redirect('/');
}