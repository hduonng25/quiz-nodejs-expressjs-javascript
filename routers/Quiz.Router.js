import express from "express";
import {changeOption, changeQuestion, create_options, create_quiz, set_correct} from "../controller/Quiz.Controller.js";
import {v1} from "uuid";

const router = express.Router();

router.post("/create", async (request, response, next) => {
    const {name, id_Subject, questions, option} = request.body;
    const create = await create_quiz(name, id_Subject, questions, option);
    next(create);
});

router.post("/create-options", async (request, response, next) => {
    const {id_question, option} = request.body;
    const createOption = await create_options(id_question, option);
    next(createOption);
});

router.post("/set-correct", async (request, response, next) => {
    const {id_question, id_option} = request.body;
    const setCorrects = await set_correct(id_question, id_option);
    next(setCorrects);
});

router.put("/changeQuestion", async (request, response, next) => {
    const {id_question, name} = request.body;
    const update = await changeQuestion(id_question, name);
    next(update);
});

router.put("/changeOption", async (request, response, next) => {
    const {id_question, id_option, name} = request.body;
    const update = await changeOption(id_question, id_option, name);
    next(update);
});
export default router;