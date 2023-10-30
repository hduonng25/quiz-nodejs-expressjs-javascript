import express from "express";
import {login} from "../controller/Auth.Controller.js";

const router = express.Router();

router.post("/login", async (request, response, next) => {
    const {username, password} = request.body;
    const signIn = await login(username, password);
    next(signIn);
});

export default router;