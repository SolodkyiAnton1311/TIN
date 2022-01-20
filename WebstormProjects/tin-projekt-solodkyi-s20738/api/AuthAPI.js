const UserRepository = require('../repository/mysql2/UserRepository')
const config = require('../config/auth/key')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.login = (req,res) => {
    const email = req.body.email
    const password = req.body.password
    UserRepository.findByEmail(email).then(user =>{
        if (!user)
        {
            return res.status(401).send({message:"Nie prawidlowy email"})
        }
        bcrypt.compare(password,user.password).then(isEqual =>{
            console.log(password)
            console.log(user.password)
            if(password !== user.password)
            {
                return res.status(401).send({message:"Nieprawidlowe haslo!"})
            }
            const token = jwt.sign({
                email: user.email,
                userId:user.id,
            },
                config.secret,
                {expiresIn:'1h'}
        )
            res.status(200).json({token:token,userId:user.id})
    }).catch(err=>{
    console.log(err)
            res.status(501)
    })
    })
}