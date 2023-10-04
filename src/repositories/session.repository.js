import { db } from "../database/database.connection.js";

export async function startSession(user_id, token) {

    const result = await db.query(`INSERT INTO sessions (user_id, token, created_at) 
                                        VALUES ($1, $2, NOW());`, [user_id, token ]);
    return result;
}