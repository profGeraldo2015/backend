import loginRoutes from "./login.routes";
import  userRoutes  from "./user.routes";

export const routes = app => {
    userRoutes(app)
    loginRoutes(app)

}

export default routes
