import { Router } from "express";
import { loginController } from "../controllers/loginController";


class LoginRoutes  {
    public router: Router = Router()
    
    constructor (){
        this.config()
    }

    config () :void {
       this.router.post('/register', loginController.register);
       this.router.post('/', loginController.login);
       this.router.get('/:token', loginController.getUser);

    }

}

const loginRoutes = new LoginRoutes()
export default loginRoutes.router