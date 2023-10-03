import { db } from "../database/database.connection.js";

export async function checkAllUsers(body) {
    const { cpf } = body;

    return await db.query(`SELECT * FROM users WHERE cpf=$1;`, [cpf]);
}

export async function insertUser(body, hash){
    const {name, email, cpf, phone} = body;
    
    return await db.query(`INSERT INTO users (name, email, password, cpf, phone) VALUES ($1, $2, $3, $4, $5);`, [name, email, hash, cpf, phone]);
}