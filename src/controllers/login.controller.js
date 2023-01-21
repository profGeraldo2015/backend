import bcrypt from "bcrypt";
import { loginValidation } from "../validators/user.validator";
import { createUser, getUsers, getById, getByEmail } from "../repositories/user.repository";
import jsonwebtoken from "jsonwebtoken";
import { eAdmin } from "../middleware/auth"


export const login = async (req, res) => {

    try {
        await loginValidation.validate(req.body)

        //const hashpassword = await bcrypt.hash(req.body.password, 10)

        //req.body.password = hashpassword

        //console.log(req.body)


        const user = await getByEmail(req.body.email)

        console.log(user.email)
        console.log(user.password)
        console.log(user.name)

        if (bcrypt.compare(req.body.password, user.password)) {

            //pode ser enviado m aiscampos com email nome etc...
            var token = jsonwebtoken.sign({ id: user.id , email: user.email, name: user.name}, process.env.JWT_PUBLIC_KEY, {
                expiresIn: 60 * 60 * 24//seg,min,hora
            })

            console.log('logado')
            res.status(201).send({
                msg: "logado",
                token: token,
                name : user.name,
            })

        } else {
            console.log('nao logado')
            res.status(400).send({ msg: "Usuario ou Senha invalida...", "status": false })
        }


    } catch (error) {
        console.log(' erro => ', error)
        res.status(400).send({ msg: "Usuario invalido", "status": false })
        //res.status(400).send(error.errors)
    }

}

export const list = async (req, res) => {
    try {
        const users = await getUsers()
        console.log('user Id ' + req.body.id)
        res.status(200).send(
            //{
                //id_usuario_logado: req.body.id,
                users: users
            //}
        )

    } catch (e) {
        res.status(400).send(e)

    }
}


export const getId = async (req, res) => {
    try {
        const user = await getById(Number(req.params.id))

        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e.errors)

    }
}

