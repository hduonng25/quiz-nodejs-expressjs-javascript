import {error, success} from "../respone/Respone.js";
import users from "../models/Users.js";
import {v1} from "uuid";
import subject from "../models/Subject.js";

export async function getSubject(id) {
    const user = await users.findOne({id: id});
    const subjects = await subject.find({fieldOfStudy: user.fieldOfStudy});
    return success(subjects);
};

export async function listSubjectAll() {
    const subjects = await subject.find({is_deleted: false});
    return success(subjects);
};

export async function createSubject(id, name, fieldOfStudy, endDate) {
    const user = await users.findOne({id: id});
    const check = await subject.findOne({name: name});
    if (check) {
        return error("duplicate_subject", "duplicate subject");
    } else {
        await subject.create({
            id: v1(),
            name: name,
            fieldOfStudy: fieldOfStudy,
            create_by: user.name,
            start_Date: new Date(),
            end_Date: new Date(endDate)
        });
        return success("create successfuly");
    }
};

export async function update_subject(id_subject, name, fieldOfStudy, startDate, endDate) {
    await subject.updateOne(
        {id: id_subject},
        {$set: {name: name, fieldOfStudy: fieldOfStudy, startDate: startDate, endDate: endDate}},
        {new: true}
    );

    return success("update");
};

export async function delete_subject(id) {
    await subject.updateOne({id: id}, {$set: {is_deleted: true}})
    return success("deleted successfuly");
};

