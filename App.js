import express, {urlencoded} from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import conflig from "./conflig/Conflig.env.js";
import {handelRespone, listens} from "./helper/Helper.js";
import api from "./routers/Index.js";

const app = express();

export const createApp = () => {
    const hostNode = "0.0.0.0";
    const portNode = conflig.portNode;
    app.use(cors());
    app.use(express.json());
    app.use(urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(api);
    app.use((data, request, respone, next) => {
        handelRespone(data, request, respone, next);
    });
    app.listen(portNode, hostNode, listens)
};