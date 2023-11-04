import quiz from "../models/Quiz.js";
import {v1} from "uuid";
import {success} from "../respone/Respone.js";

export async function create_quiz(name, id_Subject, questions) {
    let create_questions = [];
    for (const item of questions) {
        create_questions.push({
            id: v1(),
            name: item
        })
    }

    const create = await quiz.create({
        id: v1(),
        name: name,
        id_Subject: id_Subject,
        questions: create_questions.map(question => {
            return {
                id: question.id,
                name: question.name,
            }
        })
    });
    return success(create);
};

export async function create_options(id_question, option) {
    const create_option = [];
    for (const item of option) {
        create_option.push({
            id: v1(),
            id_questions: id_question,
            name: item,
            correct: false
        });
    }

    const create = await quiz.findOneAndUpdate(
        {"questions.id": id_question},
        {$set: {"questions.$.option": create_option}},
        {new: true}
    )
    return success(create);
};

export async function set_correct(id_question, id_option) {
    const setCorrect = await quiz.findOneAndUpdate(
        {
            "questions.id": id_question,
            "questions.option.id": id_option
        },
        {$set: {"questions.$.option.$[elem].correct": true}},
        {
            arrayFilters: [{"elem.id": id_option}],
            new: true
        }
    )
    // Đối tượng thứ hai trong hàm findOneAndUpdate() là một phần của bản ghi cần cập nhật. Chúng ta sử dụng $set để chỉ rõ rằng chúng ta muốn cập nhật thuộc tính "correct" của tùy chọn cụ thể. Thuộc tính $[elem] sử dụng để chỉ định tên của biến mà chúng ta sử dụng trong phần arrayFilters.
    // Phần arrayFilters được sử dụng để lọc ra tùy chọn cụ thể mà chúng ta muốn cập nhật. Chúng tôi đang lọc tùy chọn có id trùng với id_option.
    return success(setCorrect);
};

export async function changeQuestion(id_question, name) {
    const update = await quiz.findOneAndUpdate(
        {"questions.id": id_question},
        {$set: {"questions.$.name": name}},
        {new: true}
    )
    return success(update);
};

export async function changeOption(id_question, id_option, name) {
    const update = await quiz.findOneAndUpdate(
        {
            "questions.id": id_question,
            "questions.option.id": id_option
        },
        {$set: {"questions.$.option.$[elem].name": name}},
        {arrayFilters: [{"elem.id": id_option}], new: true},
    )

    return success(update);
}