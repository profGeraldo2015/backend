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
    console.log('saiu do banco -> '+users)

    return users
}

export const getAll = async ( skip , take ) => {

    //    const users = await prisma.user.findMany({select:{name:true}});
    const [users,total] = await prisma.$transaction([prisma.user.findMany({
        select:
            {name:true,
            email:true,
            phoneNumber:true},
        skip, take 
    }),
    prisma.user.count()
    ]);

   // console.log('saiu do banco -> '+users.users.data)
    
    const totalPage = Math.ceil(total / take)


    return { total, totalPage, users }

}

export const getById = async (id) => {

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    return user
}

export const getByEmail = async (email) => {

    console.log(email)

    const user = await prisma.user.findUnique({
        where: {
            email : email,
        },
    })

    return user
}