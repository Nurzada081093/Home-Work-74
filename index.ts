import express from "express";
import messagesRouter from "./routers/messages";
import {promises as fs} from 'fs';
const path = 'messages' ;

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
    const files = await fs.readdir (path);
    files.map(async (file) => {
        console.log(path + '/' + file);
    });

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(err => console.error(err));