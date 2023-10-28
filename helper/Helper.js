import mongoose from "mongoose";
import myLogs from "../winstonLogs/winstonLogs.js";
import conflig from "../conflig/Conflig.env.js";
import {BAD_REQUEST, CREATE, NO_CONTENT, OK} from "../constants/HttpsResponeCode.js";

const {dbname, hostdb, portdb, user, password, portNode} = conflig;
const dbUrl = `mongodb://${user}:${password}@${hostdb}:${portdb}/${dbname}?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=${dbname}&authMechanism=SCRAM-SHA-256`;

export async function connect() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (e) {
        myLogs.info("Connect to the database faild")
        throw e;
    }
};

export async function handelRespone(data, request, respone, next) {
    const {statusCode} = data;
    const {method, url} = request;
    if (statusCode !== OK && statusCode !== CREATE && statusCode !== NO_CONTENT) {
        respone.status(statusCode || BAD_REQUEST).send({
            code: statusCode,
            error: dat.data ? data.data : data.error,
            description: data.description
        });
    } else {
        respone.status(statusCode).send(data.data);
    }
};

export async function listens() {
    myLogs.info(`listening on port ${portNode}`)
};
