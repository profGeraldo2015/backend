import bcrypt from "bcrypt";
import { userValidation } from "../validators/user.validator";
import { createUser, getUsers, getById, updateUser ,deleteUser} from "../repositories/user.repository";

export const create = async (req, res) => {

    try {
        await userValidation.validate(req.body)

        const hashpassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashpassword

        const user = await createUser(req.body)
        
        console.log(user)

        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.errors)
    }

}

export const list = async (req, res) => {
    try {
        const users = await getUsers()

        res.status(200).send(users)
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

export const removeUser = async (req, res) => {
    try {
        await deleteUser(Number(req.params.id))

        res.status(200).send({ "msg": "User deleted" })
    } catch (e) {
        res.status(400).send(e.meta)

    }
}


export const update = async (req, res) => {
    try {
        await userValidation.validate(req.body)

        const hashpassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashpassword

        const user = await updateUser(Number(req.params.id), req.body)

        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e.errors)

    }
}