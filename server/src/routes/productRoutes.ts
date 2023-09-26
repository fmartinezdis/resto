import { Router } from "express";
import { productsController } from "../controllers/productsController";


class ProductsRoutes  {
    public router: Router = Router()
    
    constructor (){
        this.config()
    }

    config () :void {
       this.router.post('/', productsController.save);
       

    }

}

const productsRoutes = new ProductsRoutes()
export default productsRoutes.router