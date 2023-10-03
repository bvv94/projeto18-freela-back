import { db } from "../database/database.connection.js";
import { checkAllUsers, insertUser } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

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
    const { name, email, password, cpf, phone } = req.body;
    try {

        return res.sendStatus(201);
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