import { Router } from "express";

class LoginRoutes  {
    public router: Router = Router()
    
    constructor (){
        this.config()
    }

    config () :void {
        this.router.get('/',(req,res)=> {
            res.send('hello')
        })
    }

}

const loginRoutes = new LoginRoutes()
export default loginRoutes.router