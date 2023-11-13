import express from "express";
import UserAPI from "./User.Router.js";
import AuthAPI from "./Auth.Router.js";
import SubjectAPI from "./Subject.Router.js";
import QuizAPI from "./Quiz.Router.js";
import StartQuizAPI from "./Start.Quiz.Router.js";
import {checkToken} from "../validate/Token.Check.js";

const router = express.Router();

router.use('/user', UserAPI);
router.use('/auth', AuthAPI);
router.use('/subject', checkToken, SubjectAPI);
router.use('/quiz', checkToken, QuizAPI);
router.use('/startQuiz', checkToken, StartQuizAPI);

export default router;