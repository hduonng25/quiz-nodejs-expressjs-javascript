import express from "express";
import UserAPI from "./User.Router.js";
import AuthAPI from "./Auth.Router.js";
import {checkToken} from "../validate/Token.Check.js";

const router = express.Router();

router.use('/user', checkToken, UserAPI);
router.use('/auth', AuthAPI);

export default router;