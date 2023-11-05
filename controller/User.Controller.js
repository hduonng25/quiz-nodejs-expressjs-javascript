import users from "../models/Users.js";
import {v1} from "uuid";
import bcrypt from "bcrypt";
import {error, success} from "../respone/Respone.js";
import {senMailNumberRanDom} from "../mail/Send.Mail.js";
import confligMail from "../mail/Conflig.Mail.js";
import {genToken} from "../jwt/Token.js";
import Quiz from "../models/Quiz.js";
import subject from "../models/Subject.js";
import quiz from "../models/Quiz.js";

export function ranDom() {
    const length = 6;
    const characters = "0123456789";
    let random = '';
    const charLength = characters.length;

    for (let i = 0; i < length; i++) {
        random += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return random;
};

const numberRanDom = ranDom();

export async function list_user() {
    const list = await users.find({is_deleted: false});
    return success(list);
};

export async function create_user(name, user_name, password, role) {
    const pass = await bcrypt.hash(password, 10);
    const user = await users.findOne({user_name: user_name});
    if (user) {
        return error("duplica_user", "duplicate user");
    } else {
        const new_user = await users.create({
            id: v1(),
            name: name,
            user_name: user_name,
            password: pass,
            role: role
        });
        return success(new_user);
    }
};

export async function findByID(id_user) {
    const user = await users.findOne({id: id_user, is_deleted: false});
    return user;
};

export async function update_user(id_user, name, role) {
    const user = await users.findOneAndUpdate(
        {id: id_user, is_deleted: false},
        {$set: {name: name, role: role}},
        {new: true}
    );
    return success(user);
};

export async function delete_user(id_user) {
    const deleted = await users.updateOne({id: id_user}, {$set: {is_deleted: true}});
    return success("deleted successfuly", "deleted successfuly");
};

export async function findByEmail(email) {
    const user = await users.findOne({email: email});
    const payload = {numberRanDom};
    const tokenChange = await genToken(payload);
    const data = {user, email, numberRanDom, tokenChange};
    const sendMail = senMailNumberRanDom(data);
    await confligMail.sendMail(sendMail);
    return success(data);
};

export async function checkNumber(number) {
    if (number !== numberRanDom) {
        return error("Numer_wrong", "Number wrong");
    } else {
        return success("Pass");
    }
}

export async function changePass(id_user, password) {
    await user.updateOne({id: id_user}, {$set: {password: password}});
    return success("Change password successfuly");
};

export async function findQuizUser(id_user) {
    const user = await users.findOne({id: id_user});
    const id_Quiz = user.id_Quiz;
    for (const quizs of id_Quiz) {
        const quiz_list = await Quiz.findOne({id: quizs.id});
        return success(quiz_list);
    }
};

export async function applySubject(id_user, id_subject) {
    const subjects = await subject.findOne({id: id_subject});
    const user = await users.findOneAndUpdate(
        {id: id_user},
        {
            $push: {
                id_Subject: {
                    id: id_subject,
                    name_Subject: subjects.name,
                    apply_Date: new Date()
                }
            }
        },
        {new: true}
    )
    return success(user);
};

export async function getQuizBySubject(id_user, id_subject) {
    const user = await users.findOne({id: id_user});
    const quizBySubject = await quiz.find({id_Subject: id_subject});
    for (const idQuiz of quizBySubject){
        const grade_quizUser = await user.id_Quiz.find((details)=> details.id === idQuiz.id);
        return success(grade_quizUser);
    }
};