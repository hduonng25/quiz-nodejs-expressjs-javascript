import quiz from "../models/Quiz.js";
import {error, success} from "../respone/Respone.js";
import users from "../models/Users.js";

export async function getQuiz(id_quiz) {
    const quizs = await quiz.findOne({id: id_quiz});
    if (quizs) {
        const question = quizs.questions;
        return success(question);
    } else {
        return error("quiz_not found", "quiz not found");
    }
};

export async function finishQuiz(id_user, id_quiz, id_option, id_question) {
    const quizs = await quiz.findOne({id: id_quiz});
    let grade = 0;
    for (const idQuestion of id_question) {
        const question = await quizs.questions.find((details) => details.id === idQuestion);
        for (const idOption of id_option) {
            const options = await question.option.find((details) => details.id_questions === question.id && details.id === idOption);
            if (options.correct === true) {
                grade += 1;
            } else if (options.correct === false) {
                grade += 0;
            }
        }
    }

    const user = await users.findOneAndUpdate(
        {id: id_user},
        {
            $push:
                {
                    id_Quiz: {
                        id: quizs.id,
                        apply_Date: new Date(),
                        grade: grade
                    }
                }
        },
        {new: true}
    )
    return success({user});
};