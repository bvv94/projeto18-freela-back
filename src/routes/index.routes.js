import { Router } from "express";
import authRouter from "./auth.routes.js";

const router = Router();

router.use(authRouter);
// router.use(urlRouter);

// router.get("/users/me", validateAuth, me); //não sei se isso aqui vai funcionar
// router.get("/ranking", ranking);

export default router;