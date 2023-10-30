import {BAD_REQUEST} from "../constants/HttpsResponeCode.js";

export function data_not_found(data, key) {
    if (!data) {
        return {statusCode: BAD_REQUEST, data: `${key}_not_found`, description: `${key} not found`};
    }
    return undefined;
}