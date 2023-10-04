import { db } from "../database/database.connection.js";

export default async function checkPassword(token){
    
    return await db.query(`SELECT * FROM sessions WHERE token=$1 AND active = true;`,[token]);
}