import express from "express";
import {create_user, list_user} from "../controller/User.Controller.js";
import {checkCreate} from "../validate/User.Validate.js";

const router = express.Router();

router.get("/list", async (request, response, next) => {
    const list = await list_user();
    console.log(request.headers.token)
    next(list);
});

router.post("/create", checkCreate, async (request, response, next) => {
    const {name, user_name, password, role} = request.body;
    const create = await create_user(name, user_name, password, role);
    next(create);
});



export default router;