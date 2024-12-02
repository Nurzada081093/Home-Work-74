import express from 'express';
import messagesRouter from './routers/messages';
import {promises as fs} from 'fs';
import fileMessage from "./fileMessage";
const path = 'messages' ;

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
    await fileMessage.createDirectory();
    const files = await fs.readdir (path);
    files.map(async (file) => {
        const way = path + '/' + file;
        const messageText = await fs.readFile(way);
        console.log(messageText.toString());
    });

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(err => console.error(err));