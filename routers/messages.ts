import express from 'express';

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    console.log(req.body);
    res.send("Список  всех сообщений здесь");
});

messagesRouter.post("/", async (req, res) => {
    console.log(req.body);
    res.send("Создание и возвращение сообщения будет здесь");
});

export default messagesRouter;