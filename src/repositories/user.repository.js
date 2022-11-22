import { prisma } from "../services/prisma";

export const createUser = async (data) => {

    const user = await prisma.user.create({

        data,

        select: {
            id: true,
            name: true,
            phoneNumber: true

        }
    })

    return user

}

export const updateUser = async (id, data) => {

    const user = await prisma.user.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
        }
    })

    return user

}

export const deleteUser = async (id) => {

    await prisma.user.delete({ where: { id } })

    return 
}

export const getUsers = async () => {

    //    const users = await prisma.user.findMany({select:{name:true}});
    const users = await prisma.user.findMany({});

    return users
}

export const getById = async (id) => {

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    return user
}