import { login, list} from '../controllers/login.controller'
import { eAdmin }  from '../middleware/auth'

const loginRoutes = app =>{

    app.post('/login',login);

    //app.get('/login', list);
    app.get('/login',eAdmin, list);
    
}

export default loginRoutes;

