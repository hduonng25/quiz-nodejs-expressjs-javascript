import {BAD_REQUEST, CREATE, ERROR, NO_CONTENT, NOT_FOUND, OK} from "../constants/HttpsResponeCode.js";

export function success(data) {
    return {statusCode: OK, data: data};
}

export function error(data, description) {
    return {statusCode: ERROR, data: data, description: description};
}

export function bad_request(data) {
    return {statusCode: BAD_REQUEST, data: data, description: `bad request`};
}

export function create(data) {
    return {statusCode: CREATE, data: data, description: `create`};
}

export function no_content(data) {
    return {statusCode: NO_CONTENT, data: data}
}
