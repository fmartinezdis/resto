import { Request, Response } from 'express';
import db from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class LoginController {

   public async register(req: Request, res: Response) {
      let password = req.body.password;
      const salt = await bcrypt.genSalt(10)
      const hashpassword = await bcrypt.hash(password, salt);
      req.body.password = hashpassword;
      try {
         const [rows, fields] = await db.query("select * from users where email = ?", req.body.email);


         if (JSON.parse(JSON.stringify(rows)).length == 0) {

            const [rows1, fields1] = await db.query("insert into users set ?", req.body);
            const id = JSON.parse(JSON.stringify(rows1)).insertId;
            const token = jwt.sign({ id: id }, "secret")
            res.send({ message: "User register ok", token: token })
         } else {
            res.status(404).send({ message: "User already registered" })
         }
      } catch (err) {
         res.status(404).send({ message: err })
      }
   }

   public async login(req: Request, res: Response) {
      try {
         const [rows] = await db.query("select * from users where email = ?", req.body.email);
         
         if (JSON.parse(JSON.stringify(rows)).length == 0) {
            return res.status(404).send ({message: "User not found"})   
         }
         const passwordCheck = await bcrypt.compare(req.body.password,Object(rows)[0].password) 
         
         if (!passwordCheck){
            return res.status(400).send ({message: "Password is Incorrect"})   
         }

         const token = jwt.sign({id: Object(rows)[0].id},"secret");

         res.send ({message: "User Login", token: token})


      }catch (err) {
         return res.status(408).send ({message: err})   
      }   
         
   }

   public async getUser(req: Request, res: Response) {
      try {
         
         const cookie = req.params.token
         const claims = jwt.verify(cookie, "secret")
         
         if (!claims) {
            return res.status(401).send({
               message: "user not authenticated"
            })
         }

         console.log(JSON.parse(JSON.stringify(claims)).id)
         const [rows,fields] = await db.query("select * from users where id = ?", JSON.parse(JSON.stringify(claims)).id );
         
         res.json(Object(rows)[0])
      } catch (err) {
         return res.status(401).send({ message: "user not authenticated" })
      }
   }




}

export const loginController = new LoginController();