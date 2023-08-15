import {Request,Response} from 'express';
import db from '../database';


class LoginController {
   public async register (req: Request ,res : Response) {
    const [rows,fields] = await db.query("insert into users set ?",req.body);
     res.send(rows)
   }
}

export const loginController = new LoginController();