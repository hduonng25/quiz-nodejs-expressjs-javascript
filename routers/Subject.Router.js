import express from "express";
import {
    createSubject,
    delete_subject,
    getSubject,
    listSubjectAll,
    update_subject
} from "../controller/Subject.Controller.js";

const router = express.Router();

router.get("/list-by-user", async (request, response, next) => {
    const {id} = request.payload;
    const list = await getSubject(id);
    next(list);
    //Hiển thị danh sách môn học theo từng sinh viên đang theo học môn học đó
});

router.get("/list/all", async (request, response, next) => {
    const list = await listSubjectAll();
    next(list);
});

router.post("/create", async (request, response, next) => {
    const {name, fieldOfStudy, endDate} = request.body;
    const {id} = request.payload;
    const create_subject = await createSubject(id, name, fieldOfStudy, endDate);
    next(create_subject);
});

router.put("/update", async (request, response, next) => {
    const {id_subject, name, fieldOfStudy, startDate, endDate} = request.body;
    const {id} = request.payload;
    const update = await update_subject(id_subject, name, fieldOfStudy, startDate, endDate);
    next(update);
});

router.put("/deleted", async (request, response, next) => {
    const {id} = request.query;
    const deleted = await delete_subject(id);
    next(deleted);
});

export default router;