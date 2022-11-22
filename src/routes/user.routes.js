import { create, list, getId, update ,  removeUser} from '../controllers/user.controller'


const userRoutes = app =>{

    app.post('/user',create);

    app.get('/user',list);

    app.get('/user/:id',getId);

    app.put('/user/:id',update);

    app.delete('/user/:id',removeUser);



}

export default userRoutes;

