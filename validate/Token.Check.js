import {error} from "../respone/Respone.js";
import jsonwebtoken from "jsonwebtoken";
import {public_key} from "../jwt/Key.js";

export function checkToken(request, respone, next) {
    const {token} = request.headers;
    if (!token) {
        return error("token_not_found", "token not found")
    } else {
        const options = {
            algorithm: "RS256"
        }

        try {
            let payload = jsonwebtoken.verify(token, public_key, options);
            request.payload = payload;
            const {user_name, name, role, id, type} = payload;
            if (type !== "access_token") {
                return next(error("wrong_token", "wrong token"));
            } else {
                return next();
            }
        } catch (e) {
            return next(error("token_expired", "token expired"));
        }
    }
}
//Sử dụng để kiểm tra tính hợp lệ của token, kết quả của let payload = jsonwebtoken.verify(token, public_key, options); là một đối tượng json sau khi đã xác minh tính hợp lệ của token
//Nhận token từ request.headers, sau đó xác minh tính hợp lệ của token rồi trả ra payload là một đối tượng json. Nếu type của token là access_token thì trả ra payload, ngược lại thì thông báo lỗi