import jsonwebtoken from 'jsonwebtoken';
import {private_key} from "./Key.js";

export function genToken(payload) {
    const signOption = {
        expiresIn: "2h",
        algorithm: "RS256"
    }

    payload = {...payload, type: "access_token"};
    const accessToken = jsonwebtoken.sign(payload, private_key, signOption);
    return accessToken;
}

//genToken nhận vào một payload
//Payload là dữ liệu muốn đưa vào jwt, thường là kiểu dữ liệu json
//private key dùng để ký jwt
//jsonwebtoken.sign là một chuỗi jwt đã được ký bằng private key, chuỗi này được sử dụng để xác minh thông tin trong jwt

export function reloadToken(payload) {
    const signOption = {
        expiresIn: "2h",
        algorithm: "RS256"
    }

    payload = {...payload, type: "reload_token"};
    const reload_token = jsonwebtoken.sign(payload, private_key, signOption);
    return reload_token;
}