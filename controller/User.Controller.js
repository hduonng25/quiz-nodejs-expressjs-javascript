import users from "../models/Users.js";
import {v1} from "uuid";
import bcrypt from "bcrypt";
import {error, success} from "../respone/Respone.js";

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