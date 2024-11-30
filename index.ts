import express from "express";
const app = express();
const port = 8000;

app.get("/messages", (req, res) => {
    res.send("Список  всех сообщений здесь");
});

app.get("/messages/:id", (req, res) => {
    res.send("Получаю одно сообщение по его id");
});

app.post("/messages", (req, res) => {
    res.send("Создание и возвращение сообщения будет здесь");
});

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});