import {data_not_found} from "./Ultil.js";

export function checkCreate(request, respone, next) {
    const {name, user_name, password, role} = request.body;
    let name_check = data_not_found(name, "name");
    if (name_check) return next(name_check);

    let user_name_check = data_not_found(user_name, "username");
    if (user_name_check) return next(user_name_check);

    let password_check = data_not_found(password, "password");
    if (password_check) return next(password_check);

    let role_check = data_not_found(role, "role");
    if (role_check) return next(role_check);

    return next();
}