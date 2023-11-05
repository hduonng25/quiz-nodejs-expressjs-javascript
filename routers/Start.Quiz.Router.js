import express from "express";
import {finishQuiz, getQuiz} from "../controller/Start.Quiz.Controller.js";

const router = express.Router();

router.get("/getQuiz", async (request, response, next) => {
    const {id_quiz} = request.body;
    const getQuestion = await getQuiz(id_quiz);
    next(getQuestion);
});

router.post("/finishQuiz", async (request, response, next) => {
    const {id_user, id_quiz, id_option, id_question} = request.body;
    const finish = await finishQuiz(id_user, id_quiz, id_option, id_question);
    next(finish);
});

export default router;