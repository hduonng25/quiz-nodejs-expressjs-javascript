import sanitize from "mongo-sanitize";
import {BAD_REQUEST, OK} from "../constants/HttpsResponeCode";

export default function (request, next) {
    const checkSpecialCharacter = (object) => {
        const clone = JSON.parse(JSON.stringify(object));
        const cleand = sanitize(object);
        return JSON.stringify(clone) !== JSON.stringify(cleand);
    };

    const status = [
        checkSpecialCharacter(request.body),
        checkSpecialCharacter(request.params),
        checkSpecialCharacter(request.query)
    ];

    if (status.some(a => a === true)) {
        next({
            statusCode: BAD_REQUEST,
            error: "data_invalid",
            description: "data is in valid"
        });
    }

    next();
};