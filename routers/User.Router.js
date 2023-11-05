import express from "express";
import {
    applySubject,
    changePass,
    checkNumber,
    create_user,
    delete_user,
    findByEmail,
    findByID,
    findQuizUser,
    getQuizBySubject,
    list_user,
    update_user
} from "../controller/User.Controller.js";
import {checkCreate, checkUpdate} from "../validate/User.Validate.js";

const router = express.Router();

router.get("/list", async (request, response, next) => {
    const list = await list_user();
    next(list);
});

router.post("/create", checkCreate, async (request, response, next) => {
    const {name, user_name, password, role} = request.body;
    const create = await create_user(name, user_name, password, role);
    next(create);
});

router.get("/update/:id_user", async (request, response, next) => {
    const {id_user} = request.params;
    const user = await findByID(id_user);
    next(user);
});

router.put("/save-update", checkUpdate, async (request, response, next) => {
    const {id_user, name, role} = request.body;
    const update = await update_user(id_user, name, role);
    next(update);
});

router.put("/deleted", async (request, response, next) => {
    const {id_user} = request.body;
    const deleted = await delete_user(id_user);
    next(deleted);
});

router.post("/send-number-to-email", async (request, response, next) => {
    const {email} = request.body;
    const user = await findByEmail(email);
    next(user);
});

router.post("/check-number", async (request, response, next) => {
    const {numberRanDom} = request.payload;
    const check = await checkNumber(numberRanDom);
    next(check);
});

router.put("/change-pass", async (request, response, next) => {
    const {id_user, password} = request.body;
    const change = await changePass(id_user, password);
    next(change);
});

router.get("/quiz", async (request, response, next) => {
    const {id_user} = request.query;
    const quiz = await findQuizUser(id_user);
    next(quiz);
});

router.post("/apply-subject", async (request, response, next) => {
    const {id_user, id_subject} = request.body;
    const apply = await applySubject(id_user, id_subject);
    next(apply);
});

router.get("/grade", async (request, response, next) => {
    const {id_user, id_subject} = request.body;
    const grade = await getQuizBySubject(id_user, id_subject);
    next(grade);
});

export default router;