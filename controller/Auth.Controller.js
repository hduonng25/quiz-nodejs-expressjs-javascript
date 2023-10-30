import bcrypt from "bcrypt";
import users from "../models/Users.js";
import {error, success} from "../respone/Respone.js";
import {genToken, reloadToken} from "../jwt/Token.js";

export async function login(username, password) {
    const user = await users.findOne({user_name: username});
    if (!user) {
        return error("user_not_found", "user not found");
    } else {
        try {
            const checkPass = await bcrypt.compareSync(password, user.password);
            if (!checkPass) {
                return error("wrong_password", "wrong password");
            } else {
                const {user_name, name, role, id} = user;
                const payload = {user_name, name, role, id};
                const token = genToken(payload);
                const reload_token = reloadToken(payload);
                const data = {
                    token, reload_token
                }
                return success(data);
            }
        } catch (e) {
            return error(e, "login faild");
        }
    }
};

//Truyền vào genToken một payload, payload là dữ liê muôốn truyền vào token