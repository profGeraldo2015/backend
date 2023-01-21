import jsonwebtoken from "jsonwebtoken";

const { promisify} = require('util')

module.exports = {

    eAdmin: async function(req, res, next) {
        console.log(' header auth => '+req.headers.authorization)
        const authHeader = req.headers.authorization
        //console.log(authHeader)
        if(!authHeader){
            return res.status(403).send({ msg:"Erro falta o token...",status:false})
        }

        const [, token ] = authHeader.split(' ')
    //    console.log('t => ' + token)

        if(!token){
            return res.status(403).send({ msg:"Erro falta o token... b ",status:false})
        }

        try {
            const decode = await promisify(jsonwebtoken.verify)(token, process.env.JWT_PUBLIC_KEY )
//            console.log('decode.id '+decode.id)
            req.body.id = decode.id 
  //          console.log(' req '+req.body.id)

            return next()

        } catch (error) {
            return res.status(403).send({ msg:"Necessario realizar login, Token invalido...",status:false})
        }
    }
}


