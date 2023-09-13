"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashpassword = yield bcrypt_1.default.hash(password, salt);
            req.body.password = hashpassword;
            try {
                const [rows, fields] = yield database_1.default.query("select * from users where email = ?", req.body.email);
                if (JSON.parse(JSON.stringify(rows)).length == 0) {
                    const [rows1, fields1] = yield database_1.default.query("insert into users set ?", req.body);
                    const id = JSON.parse(JSON.stringify(rows1)).insertId;
                    const token = jsonwebtoken_1.default.sign({ id: id }, "secret");
                    res.send({ message: "User register ok", token: token });
                }
                else {
                    res.status(404).send({ message: "User already registered" });
                }
            }
            catch (err) {
                res.status(404).send({ message: err });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query("select * from users where email = ?", req.body.email);
                if (JSON.parse(JSON.stringify(rows)).length == 0) {
                    return res.status(404).send({ message: "User not found" });
                }
                const passwordCheck = yield bcrypt_1.default.compare(req.body.password, Object(rows)[0].password);
                if (!passwordCheck) {
                    return res.status(400).send({ message: "Password is Incorrect" });
                }
                const token = jsonwebtoken_1.default.sign({ id: Object(rows)[0].id }, "secret");
                res.send({ message: "User Login", token: token });
            }
            catch (err) {
                return res.status(408).send({ message: err });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookie = req.params.token;
                const claims = jsonwebtoken_1.default.verify(cookie, "secret");
                if (!claims) {
                    return res.status(401).send({
                        message: "user not authenticated"
                    });
                }
                console.log(JSON.parse(JSON.stringify(claims)).id);
                const [rows, fields] = yield database_1.default.query("select * from users where id = ?", JSON.parse(JSON.stringify(claims)).id);
                res.json(Object(rows)[0]);
            }
            catch (err) {
                return res.status(401).send({ message: "user not authenticated" });
            }
        });
    }
}
exports.loginController = new LoginController();
