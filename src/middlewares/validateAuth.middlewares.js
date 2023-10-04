import checkPassword from "../repositories/auth.repository.js";

export default async function validateAuth(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try{    
        const session = await checkPassword(token);
        if(session.rows.length === 0) return res.sendStatus(401);
        
        res.locals.session = session.rows[0];
        next();
    }
    catch (err){ 
        res.status(500).send(err.message);
    }
}