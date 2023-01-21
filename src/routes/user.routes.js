import { create, list, getId, update ,  page, removeUser} from '../controllers/user.controller'
import { eAdmin } from "../middleware/auth"

const userRoutes = app =>{

    app.post('/user',create);

    //app.get('/user',eAdmin, list);
    
    app.get('/user',list);

    app.get('/userpage/:skip/:page',page);

    app.get('/user/:id',getId);

    app.put('/user/:id',update);

    app.delete('/user/:id',removeUser);



}

export default userRoutes;

