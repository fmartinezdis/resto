import { Request, Response } from 'express';
import db from '../database';

class ProductsController {

    public async save(req: Request, res: Response) {
        try {
              const [rows1, fields1] = await db.query("insert into products set ?", req.body);
              res.send({ message: "Product added!"});
        } catch (err) {
           res.status(404).send({ message: err })
        }
     }
}

export const productsController = new ProductsController();