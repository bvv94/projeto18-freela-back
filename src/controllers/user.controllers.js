import { startSession } from "../repositories/session.repository.js";
import { checkAllUsers, insertUser } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export async function sign_up(req, res) {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) return res.status(422).send("Senhas não são iguais!!!")

    const exists = await checkAllUsers(req.body);

    if (exists.rowCount !== 0) {
        return res.status(409).send("cpf já cadastrado!")
    }

    const hash = bcrypt.hashSync(password, 10);

    const result = insertUser(req.body, hash)

    if (result) return res.sendStatus(201);

    res.status(500).send(err.message);

}

export async function sign_in(req, res) {
    const { cpf, password } = req.body;

    try {
        const exists = await checkAllUsers(cpf);
        
        if (exists.rows.length === 0) return res.status(401).send("Usuário/senha inválidos");

        const isPasswordCorrect = bcrypt.compareSync(password, exists.rows[0].password);
        if (!isPasswordCorrect) return res.status(401).send("Usuário/senha inválidos");

        const token = uuid();

        const start = startSession(exists.rows[0].id, token);

        if(start) return res.sendStatus(201);

        res.sendStatus(404);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function sign_out(req, res) {
    const { name, email, password, cpf, phone } = req.body;
    try {

        return res.sendStatus(201);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}